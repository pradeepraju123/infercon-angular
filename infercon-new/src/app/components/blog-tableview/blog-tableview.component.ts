import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router
import { BlogService } from '../../services/blog.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EditBlogComponent } from '../../controller/edit-blog/edit-blog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-blog-tableview',
  templateUrl: './blog-tableview.component.html',
  styleUrls: ['./blog-tableview.component.css']
})
export class BlogTableviewComponent {
  blogdata: any[]=[]; // Define a property to store the fetched data

  constructor(private blogService: BlogService, private router: Router, public dialog: MatDialog) { };
  editServices(serviceId: String) {
    this.router.navigate(['/app-edit-services', serviceId]);  // Navigate to the edit component with the ID
  }
  openDialog(_id: String) {
    this.dialog.open(EditBlogComponent, {
      data: {
        itemId: _id,
      }
    });
  }
  
  ngOnInit(): void {
    this.blogService.getAllblogs().subscribe((data: any) => {
      this.blogdata = data.data;
    });
  }
}
