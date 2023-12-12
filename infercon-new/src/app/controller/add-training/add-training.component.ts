import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { UploadService } from '../../services/upload.service';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('true', style({ transform: 'translateX(30px)' })), // Adjust the values as needed
      state('false', style({ transform: 'translateX(0)' })),
      transition('* <=> *', animate('0.3s ease-in-out')),
    ]),
  ],
  
})
export class AddTrainingComponent implements OnInit {
  filedata:any;
  training: any = {}; // Initialize with an empty object
  successMessage: string | null = null;
  errorMessage: string | null = null;
  image: string | null = null; // To store the selected image file
  imagePreview : any;
  trainingForm!: FormGroup;
  inputState = 'inactive';

  onInputFocus() {
    this.inputState = 'active';
  }

  onInputBlur() {
    this.inputState = 'inactive';
  }
  constructor(private route: ActivatedRoute, private trainingService: TrainingService,  private uploadService : UploadService, private location : Location, private fb: FormBuilder) {}
  // imageUrl: Observable<string>;
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
  displayImagePreview(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event && event.target) {
          this.imagePreview = event.target.result as string;
        } else {
          // Handle the case where event or event.target is null
          console.error('Event or event.target is null.');
        }
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    const trainingFormGroup = this.createTrainingFormGroup(); // Create a new FormGroup for training details
    
    if (this.image) {
      this.uploadService.uploadImage(this.image).subscribe(
        (fileName) => {
          trainingFormGroup.controls['image'].setValue(fileName); // Set the image in the new form group
          this.updateArrays(trainingFormGroup); // Update arrays before creating the training
          this.createTraining(trainingFormGroup);
        },
        (error) => {
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      // Only update arrays and create training if an image is selected
      console.log('No image selected. Only updating other parameters.');
      this.updateArrays(trainingFormGroup); // Update arrays before creating the training
      this.createTraining(trainingFormGroup);
    }
  }
  
  
  updateArrays(formGroup: FormGroup) {
    // Update event_details and systems_used arrays in the new form group
    formGroup.controls['event_details'].setValue(this.trainingForm.value.event_details);
    formGroup.controls['systems_used'].setValue(this.trainingForm.value.systems_used);
  }
  
  createTraining(trainingFormGroup: FormGroup) {
    this.trainingService.createTraining(trainingFormGroup.value)
      .subscribe(
        () => {
          this.successMessage = 'Training was created successfully.';
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = 'Failed to create training.';
          this.successMessage = null;
        }
      );
  }
  
  toggleSwitch() {
    const publishedControl = this.trainingForm.get('published');
    if (publishedControl) {
      publishedControl.setValue(!publishedControl.value);
    }
  }
  
  createTrainingFormGroup(): FormGroup {
    return this.fb.group({
      title: [this.trainingForm.value.title, Validators.required],
      meta_title: [this.trainingForm.value.meta_title,, Validators.required],
      keywords: [this.trainingForm.value.keywords,, Validators.required],
      meta_description: [this.trainingForm.value.meta_description,, Validators.required],
      short_description: [this.trainingForm.value.short_description],
      description: [this.trainingForm.value.description],
      published: [this.trainingForm.value.published],
      image: [''],
      event_details: [this.trainingForm.value.event_details],
      systems_used: [this.trainingForm.value.systems_used],
    });
  }
  
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.trainingForm = this.fb.group({
      title: ['', Validators.required],
      meta_title: ['', Validators.required],
      keywords: ['', Validators.required],
      meta_description: ['', Validators.required],
      short_description: [''],
      description: [''],
      published: [false],
      image: [''],
      event_details: this.fb.array([]),
      systems_used: this.fb.array([]),
    });
  }
  get eventDetails(): FormArray {
    return this.trainingForm.get('event_details') as FormArray;
  }

  get systemsUsed(): FormArray {
    return this.trainingForm.get('systems_used') as FormArray;
  }

  addEventDetail() {
    this.eventDetails.push(this.fb.group({
      title: [''],
      detail: [''],
    }));
  }

  removeEventDetail(index: number) {
    this.eventDetails.removeAt(index);
  }

  addSystemUsed() {
    this.systemsUsed.push(this.fb.group({
      title: [''],
      detail: [''],
    }));
  }

  removeSystemUsed(index: number) {
    this.systemsUsed.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }

}
