import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AddBlogComponent } from '../add-blog/add-blog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent {
  isCardView = true;

  toggleView() {
    this.isCardView = !this.isCardView;
  }
  constructor(private router: Router, public dialog: MatDialog) { }
  redirectToCreateBlogs() {
    this.router.navigate(['/app-add-blog']); // Navigate to the 'addtraining' component
  }
  openDialog() {
    this.dialog.open(AddBlogComponent);
  }
  
}
