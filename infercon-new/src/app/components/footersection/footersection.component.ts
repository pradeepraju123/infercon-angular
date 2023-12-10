import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-footersection',
  templateUrl: './footersection.component.html',
  styleUrl: './footersection.component.css'
})
export class FootersectionComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(BookingComponent);
  }
}
