import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  showText: boolean = false;
  trainings: any[]=[]; // Define a property to store the fetched data
  contentLoaded: boolean = false;
  data = {}
  constructor(private trainingService: TrainingService) { };

  ngOnInit(): void {
    this.fetchAllTrainings();
  }
  fetchAllTrainings(): void {
    this.trainingService.getAllTraining(this.data).subscribe((data: any) => {
      this.trainings = data.data;
      this.contentLoaded = true;
    });
  }
  
}
