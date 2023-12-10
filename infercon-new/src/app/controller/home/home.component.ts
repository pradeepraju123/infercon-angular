import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BlogService } from '../../services/blog.service';
import { TrainingService } from '../../services/training.service';
import { BookingComponent } from '../../components/booking/booking.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideIn', [
      state('hidden', style({ transform: 'translateX(-100%)' })), // Starting position
      state('visible', style({ transform: 'translateX(0)' })), // End position
      transition('hidden => visible', animate('500ms ease-in')), // Animation duration and easing
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('animatedDiv') animatedDiv!: ElementRef;
  blogdata: any[] = [];
  state: string = 'hidden';
  contentLoaded: boolean = false;
  limit: number = 2;
  showText: boolean = false;
  trainings: any[]=[]; // Define a property to store the fetched data
  data = {}
  constructor(private blogService: BlogService, private trainingService: TrainingService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.blogService.getAllblogstest(this.limit).subscribe((data: any) => {
      this.blogdata = data.data;
      this.contentLoaded = true;
      this.fetchAllTrainings();
    });
  }

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          this.contentLoaded = true; // Triggering the animation by changing contentLoaded
        }
      });
    }, options);
  
    observer.observe(this.animatedDiv.nativeElement);
  }
  playAnimation(target: Element) {
    this.state = 'visible';
  }
  fetchAllTrainings(): void {
    this.trainingService.getAllTraining(this.data).subscribe((data: any) => {
      this.trainings = data.data;
      this.contentLoaded = true;
    });
  }
  openDialog() {
    this.dialog.open(BookingComponent);
  }
  }
