import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesdataService } from '../../services/servicesdata.service';
import { UploadService } from '../../services/upload.service';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('true', style({ transform: 'translateX(30px)' })), // Adjust the values as needed
      state('false', style({ transform: 'translateX(0)' })),
      transition('* <=> *', animate('0.3s ease-in-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EditServicesComponent implements OnInit {
  filedata: any;
  training: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;
  image: string | null = null;
  imagePreview: any;
  serviceForm!: FormGroup;
  servicesId: string | null = null; // Add a property to store the training ID

  constructor(
    private route: ActivatedRoute,
    private servicedataService: ServicesdataService,
    private uploadService: UploadService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  fileEvent(event: any) {
    // Handle the file input change event
    const file = event.target.files[0];
    this.image = file;
    
    // Display a preview of the new image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  // displayImagePreview(file: File) {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event && event.target) {
  //         this.imagePreview = event.target.result as string;
  //       } else {
  //         console.error('Event or event.target is null.');
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onSubmit() {
    const servicesFromgroup = this.createservicesFromgroup();
  
    if (this.image) {
      this.uploadService.uploadImage(this.image).subscribe(
        (fileName) => {
          // Update the image parameter only when an image is selected
          servicesFromgroup.controls['image'].setValue(fileName);
          this.updateArrays(servicesFromgroup);
          if (this.servicesId) {
            this.updateServicesdata(servicesFromgroup);
          } else {
            this.createServices(servicesFromgroup);
          }
        },
        (error) => {
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      // Do not update the image parameter if no image is selected
      this.updateArrays(servicesFromgroup);
      if (this.servicesId) {
        this.updateServicesdata(servicesFromgroup);
      } else {
        this.createServices(servicesFromgroup);
      }
    }
  }
  


  updateArrays(formGroup: FormGroup) {
    formGroup.controls['comments'].setValue(this.serviceForm.value.comments);
    formGroup.controls['questions_and_answers'].setValue(this.serviceForm.value.questions_and_answers);
  }

  createservicesFromgroup(): FormGroup {
    return this.fb.group({
      title: [this.serviceForm.value.title, Validators.required],
      short_description: [this.serviceForm.value.short_description],
      description: [this.serviceForm.value.description],
      published: [this.serviceForm.value.published],
      image: [''],
      comments: [this.serviceForm.value.comments],
      questions_and_answers: [this.serviceForm.value.questions_and_answers],
    });
  }

  toggleSwitch() {
    const publishedControl = this.serviceForm.get('published');
    if (publishedControl) {
      publishedControl.setValue(!publishedControl.value);
    }
  }

  createServices(servicesFormGroup: FormGroup) {
    this.servicedataService.createServices(servicesFormGroup.value).subscribe(
      () => {
        this.successMessage = 'services was created successfully.';
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Failed to create services.';
        this.successMessage = null;
      }
    );
  }

  updateServicesdata(servicesFormGroup: FormGroup) {
    if (this.servicesId) {
      this.servicedataService.updateServicesdata(this.servicesId, servicesFormGroup.value).subscribe(
        () => {
          this.successMessage = 'services was updated successfully.';
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = 'Failed to update services.';
          this.successMessage = null;
        }
      );
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe((params) => {
      this.servicesId = params.get('id');
      if (this.servicesId) {
        this.getServicedata(this.servicesId);
      }
    });
  }

  initializeForm() {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      short_description: [''],
      description: [''],
      published: [false],
      image: [''],
      comments: this.fb.array([]),
      questions_and_answers: this.fb.array([]),
    });
  }
  
  get comments(): FormArray {
    return this.serviceForm.get('comments') as FormArray;
  }

  get questions_and_answers(): FormArray {
    return this.serviceForm.get('questions_and_answers') as FormArray;
  }

  addcomments() {
    this.comments.push(this.fb.group({
      question: [''],
      answer: [''],
    }));
  }

  removecomments(index: number) {
    this.comments.removeAt(index);
  }

  addQuestionAndAnswer() {
    this.questions_and_answers.push(this.fb.group({
      question: [''],
      answer: [''],
    }));
  }

  removeQuestionAndAnswer(index: number) {
    this.questions_and_answers.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }

  getServicedata(serviceId: string) {
    this.servicedataService.getServicedata(serviceId).subscribe(
      (serviceDetails) => {
        // Populate the static form controls
        this.serviceForm.patchValue({
          title: serviceDetails.title,
          short_description: serviceDetails.short_description,
          description: serviceDetails.description,
          published: serviceDetails.published,
          image: serviceDetails.image,
        });
  
        // Display the image preview
        this.displayImagePreview(serviceDetails.image);
  
        // Populate the dynamic form controls for event_details
        this.comments.clear(); // Clear existing form controls
  
        for (const cmt of serviceDetails.comments) {
          this.addcomments(); // Add a new form control
          const lastIndex = this.comments.length - 1;
  
          // Patch the values for the last added form control
          this.comments.at(lastIndex).patchValue({
            question: cmt.question,
            answer: cmt.answer,
          });
        }
  
        // Populate the dynamic form controls for systems_used
        this.questions_and_answers.clear(); // Clear existing form controls
  
        for (const qa of serviceDetails.questions_and_answers) {
          this.addQuestionAndAnswer(); // Add a new form control
          const lastIndex = this.questions_and_answers.length - 1;
  
          // Patch the values for the last added form control
          this.questions_and_answers.at(lastIndex).patchValue({
            question: qa.question,
            answer: qa.answer,
          });
        }
      },
      (error) => {
        console.error('Failed to fetch training details:', error);
      }
    );
  }
  
  displayImagePreview(imageUrl: string) {
    if (imageUrl) {
      // Set the imagePreview property to the imageUrl
      this.imagePreview = imageUrl;
    }
  }
}
