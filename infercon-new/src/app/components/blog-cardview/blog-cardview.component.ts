import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router
import { BlogService } from '../../services/blog.service';
import { EditBlogComponent } from '../../controller/edit-blog/edit-blog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-blog-cardview',
  templateUrl: './blog-cardview.component.html',
  styleUrls: ['./blog-cardview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogCardviewComponent {
  // contentLoaded = false;
  contentLoaded: boolean = false;
  @Input() showButton: boolean = true;
  
  blogdata: any[]=[]; // Define a property to store the fetched data
  
  constructor(private blogService: BlogService, private router: Router,public dialog: MatDialog) { };
  editServices(serviceId: String) {
    this.router.navigate(['/app-edit-blog', serviceId]);  // Navigate to the edit component with the ID
  }
  ngOnInit(): void {
    this.blogService.getAllblogs().subscribe((data: any) => {
      this.contentLoaded = true;
      this.blogdata = data.data;
},
(error) => {
  console.error('Error loading data: ', error);
  // Handle the error (e.g., show an error message or retry the request)
}
);
  }
  openDialog(_id: String) {
    this.dialog.open(EditBlogComponent, {
      data: {
        itemId: _id,
      }
    });
  }
}
