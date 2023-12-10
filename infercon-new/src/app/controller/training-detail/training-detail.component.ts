import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent {
  training: any;

  constructor(private route: ActivatedRoute, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const trainingId = params.get('id');
      if (trainingId) {
        this.trainingService.getTrainingById(trainingId).subscribe(
          (data) => {
            this.training = data.data; // Assuming your API response has a 'data' property
          },
          (error) => {
            console.error('Error fetching training details:', error);
          }
        );
      }
    });
  }
}
