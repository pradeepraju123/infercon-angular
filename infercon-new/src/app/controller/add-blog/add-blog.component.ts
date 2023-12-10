import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BlogService } from '../../services/blog.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('true', style({ transform: 'translateX(30px)' })), // Adjust the values as needed
      state('false', style({ transform: 'translateX(0)' })),
      transition('* <=> *', animate('0.3s ease-in-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddBlogComponent {
  filedata:any;
  blogdata: any = {}; // Initialize with an empty object
  successMessage: string | null = null;
  errorMessage: string | null = null;
  image: string | null = null; // To store the selected image file
  imagePreview : any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private route: ActivatedRoute, private blogService: BlogService,  private uploadService : UploadService, private location : Location,private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddBlogComponent>, ) {}
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
    if (this.image) {
      // First, upload the image and get the filename
      this.uploadService.uploadImage(this.image).subscribe(
        (fileName) => {
          this.blogdata.image = fileName; // Update the 'image' property of the training object with the filename
          this.createBlogsnew(); // Proceed to update the training
        },
        (error) => {
          // Handle the case where image upload fails
          console.error('Failed to upload the image:', error);
        }
      );
    } else {
      this.createBlogsnew(); // Update the training without an image
    }
  }
  
  createBlogsnew() {
    this.blogService.createBlogs(this.blogdata)
      .subscribe(
        () => {
          this.successMessage = 'Blog was created successfully.';
          this.errorMessage = null;
          this.openSnackBar(this.successMessage)
          this.dialogRef.close();
        },
        (error) => {
          this.errorMessage = 'Failed to create training.';
          this.successMessage = null;
          this.openSnackBar(this.errorMessage)
        }
      );
  }
  goBack(): void {
    this.location.back(); // This uses the Angular Location service to navigate back.
  }
  toggleSwitch() {
    this.blogdata.published = !this.blogdata.published;
    if (this.blogdata.published){
      
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
