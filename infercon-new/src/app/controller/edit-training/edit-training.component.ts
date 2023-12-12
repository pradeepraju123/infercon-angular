import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { UploadService } from '../../services/upload.service';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('true', style({ transform: 'translateX(30px)' })), // Adjust the values as needed
      state('false', style({ transform: 'translateX(0)' })),
      transition('* <=> *', animate('0.3s ease-in-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EditTrainingComponent implements OnInit {
  filedata: any;
  training: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;
  image: string | null = null;
  imagePreview: any;
  trainingForm!: FormGroup;
  trainingId: string | null = null; // Add a property to store the training ID
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private uploadService: UploadService,
    private location: Location,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {itemId: string},
    private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<EditTrainingComponent>,
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
    const trainingFormGroup = this.createTrainingFormGroup();
  
    if (this.image) {
      this.uploadService.uploadImage(this.image).subscribe(
        (fileName) => {
          // Update the image parameter only when an image is selected
          trainingFormGroup.controls['image'].setValue(fileName);
          this.updateArrays(trainingFormGroup);
          if (this.trainingId) {
            this.updateTraining(trainingFormGroup);
          } else {
            this.createTraining(trainingFormGroup);
          }
        },
        (error) => {
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      // Do not update the image parameter if no image is selected
      this.updateArrays(trainingFormGroup);
      if (this.trainingId) {
        this.updateTraining(trainingFormGroup);
      } else {
        this.createTraining(trainingFormGroup);
      }
    }
  }
  


  updateArrays(formGroup: FormGroup) {
    formGroup.controls['event_details'].setValue(this.trainingForm.value.event_details);
    formGroup.controls['systems_used'].setValue(this.trainingForm.value.systems_used);
  }

  createTraining(trainingFormGroup: FormGroup) {
    this.trainingService.createTraining(trainingFormGroup.value).subscribe(
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

  updateTraining(trainingFormGroup: FormGroup) {
    if (this.trainingId) {
      this.trainingService.updateTraining(this.trainingId, trainingFormGroup.value).subscribe(
        () => {
          this.successMessage = 'Training was updated successfully.';
          this.errorMessage = null;
          this.openSnackBar(this.successMessage)
          this.dialogRef.close();
        },
        (error) => {
          this.errorMessage = 'Failed to update training.';
          this.successMessage = null;
          this.openSnackBar(this.errorMessage)
          this.dialogRef.close();
        }
      );
    }
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
      meta_title: [this.trainingForm.value.meta_title, Validators.required],
      keywords: [this.trainingForm.value.keywords, Validators.required],
      meta_description: [this.trainingForm.value.meta_description, Validators.required],
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
    const id = this.data.itemId;
    if (id){
      this.trainingId = id;
      if (this.trainingId) {
        this.getTrainingDetails(this.trainingId);
      }
    }
     
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

  getTrainingDetails(trainingId: string) {
    this.trainingService.getTraining(trainingId).subscribe(
      (trainingDetails) => {
        // Populate the static form controls
        this.trainingForm.patchValue({
          title: trainingDetails.title,
          meta_title:trainingDetails.meta_title,
          keywords: trainingDetails.keywords,
          meta_description: trainingDetails.meta_description,
          short_description: trainingDetails.short_description,
          description: trainingDetails.description,
          published: trainingDetails.published,
          image: trainingDetails.image,
        });
  
        // Display the image preview
        this.displayImagePreview(trainingDetails.image);
  
        // Populate the dynamic form controls for event_details
        this.eventDetails.clear(); // Clear existing form controls
  
        for (const event of trainingDetails.event_details) {
          this.addEventDetail(); // Add a new form control
          const lastIndex = this.eventDetails.length - 1;
  
          // Patch the values for the last added form control
          this.eventDetails.at(lastIndex).patchValue({
            title: event.title,
            detail: event.detail,
          });
        }
  
        // Populate the dynamic form controls for systems_used
        this.systemsUsed.clear(); // Clear existing form controls
  
        for (const system of trainingDetails.systems_used) {
          this.addSystemUsed(); // Add a new form control
          const lastIndex = this.systemsUsed.length - 1;
  
          // Patch the values for the last added form control
          this.systemsUsed.at(lastIndex).patchValue({
            title: system.title,
            detail: system.detail,
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
  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', 
    {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
}
