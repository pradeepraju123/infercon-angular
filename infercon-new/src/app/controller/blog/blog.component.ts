import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogdata: any[]=[]; // Define a property to store the fetched data
  contentLoaded: boolean = false;
  limit: number = 20; // Set your desired limit here
  constructor(private blogService: BlogService) { };

  ngOnInit(): void {
    this.blogService.getAllblogstest(this.limit).subscribe((data: any) => {
      this.blogdata = data.data;
      this.contentLoaded = true;
    });
  }

}
