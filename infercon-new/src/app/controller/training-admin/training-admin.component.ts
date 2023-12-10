import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../add-training/add-training.component';
@Component({
  selector: 'app-training-admin',
  templateUrl: './training-admin.component.html',
  styleUrls: ['./training-admin.component.css']
})
export class TrainingAdminComponent {
  isCardView = true;

  toggleView() {
    this.isCardView = !this.isCardView;
  }
  constructor(private router: Router, public dialog: MatDialog) { }
  redirectToCreateTraining() {
    this.router.navigate(['/app-add-training']); // Navigate to the 'addtraining' component
  }
  openDialog() {
    this.dialog.open(AddTrainingComponent);
  }
}
