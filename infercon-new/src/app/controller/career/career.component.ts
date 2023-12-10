import { Component } from '@angular/core';
import { CareersService } from '../../services/careers.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  careerdata: any = {}; // Initialize with an empty object
  successMessage: string | null = null;
  errorMessage: string | null = null;
  resume :string | null = null;
 
  constructor(public careerServices: CareersService, public uploadService: UploadService) {}
  fileEvent(event: any) {
    // Handle the file input change event
    const file = event.target.files[0];
    this.resume = file;
    
    // Display a preview of the new image
    const reader = new FileReader();
    reader.onload = (e: any) => {
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.resume) {
      // First, upload the image and get the filename
    this.uploadService.uploadImage(this.resume).subscribe(
        (fileName) => {
          this.careerdata.resume = fileName; // Update the 'image' property of the training object with the filename
          this.createCareers(); // Proceed to update the training
        },
        (error) => {
          // Handle the case where image upload fails
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      this.createCareers(); // Update the training without an image
    }
}
createCareers() {
    this.careerServices.createCareer(this.careerdata)
      .subscribe(
        () => {
          this.successMessage = 'Thanks for Submitting Career form! We will get back you Shortly.';
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = 'Failed to submit career.';
          this.successMessage = null;
        }
      );
  }
}
