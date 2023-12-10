import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { UploadService } from '../../services/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { countries } from '../../model/country-data-store';
import { courses } from '../../model/course-data-store';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public countries:any = countries
  registrationForm: FormGroup;
  registrationData: any = {}; // Initialize with an empty object
  successMessage: string | null = null;
  errorMessage: string | null = null;
  document :string | null = null;
  public courses:any = courses

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public registrationService: RegistrationService, 
    public uploadService: UploadService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,) {
    this.registrationForm = this.fb.group({
      modeOfEducation: ['', Validators.required],
      firstname: ['', [Validators.required]],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      bday: ['', Validators.required],
      country: ['', Validators.required],
      gender: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      additionalMobile: [''],
      workMobile: [''],
      company: [''],
      comments: [''],
      education: [''],
      industryexp: [''],
      yearsOfExp: [''],
      governmentId: [''],
      currencyType: [''],
      feesCurrency: [''],
      courses: ['']
    });
  }
  ngOnInit(): void {
    
  }
  fileEvent(event: any) {
    // Handle the file input change event
    const file = event.target.files[0];
    this.document = file;
    
    // Display a preview of the new image
    const reader = new FileReader();
    reader.onload = (e: any) => {
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.document) {
      // First, upload the image and get the filename
      this.uploadService.uploadImage(this.document).subscribe(
        (fileName) => {
          console.log(fileName)
          const formData = this.registrationForm.value;
          const combinedPhoneNumber = `+${this.registrationForm.value.country}${this.registrationForm.value.mobile}`;
          formData.mobile = combinedPhoneNumber;
          formData.document = fileName; // Update the 'document' property in formData with the filename
          this.createRegister(formData); // Proceed to update the registration with form data
        },
        (error) => {
          // Handle the case where image upload fails
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      const formData = this.registrationForm.value;
      const combinedmobile = `${this.registrationForm.value.country}${this.registrationForm.value.mobile}`;
      const combinedAdditionalmobile = `${this.registrationForm.value.country}${this.registrationForm.value.additionalMobile}`;
      const combineWorkdmobile = `${this.registrationForm.value.country}${this.registrationForm.value.workMobile}`;
      formData.mobile = combinedmobile;
      formData.additionalMobile = combinedAdditionalmobile;
      formData.workMobile = combineWorkdmobile;

      this.createRegister(formData); // Update the registration without an image
    }
  }
  
  createRegister(formData: any) {
    if (this.registrationForm.valid) {
      this.registrationService.createRegistration(formData)
        .subscribe(
          () => {
            this.successMessage = 'Thanks for Register! We will get back to you shortly.';
            this.errorMessage = null;
            this.openSnackBar(this.successMessage);
          },
          (error) => {
            this.errorMessage = 'Failed to submit Registration form.';
            this.successMessage = null;
            this.openSnackBar(this.errorMessage);
          }
        );
    } else {
      // Handle form validation errors
      // You may want to show an error message or highlight the invalid fields
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
