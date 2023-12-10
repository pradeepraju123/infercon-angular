import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Router } from '@angular/router';  // Import the Router
import { ServicesdataService } from '../../services/servicesdata.service';
@Component({
  selector: 'app-services-cardview',
  templateUrl: './services-cardview.component.html',
  styleUrls: ['./services-cardview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ServicesCardviewComponent {
  // contentLoaded = false;
  contentLoaded: boolean = false;
  @Input() showButton: boolean = true;
  
  servicesdata: any[]=[]; // Define a property to store the fetched data
  
  constructor(private servicesdataService: ServicesdataService, private router: Router) { };
  editServices(serviceId: String) {
    this.router.navigate(['/app-edit-services', serviceId]);  // Navigate to the edit component with the ID
  }
  ngOnInit(): void {
    this.servicesdataService.getAllServicesdata().subscribe((data: any) => {
      this.contentLoaded = true;
      this.servicesdata = data.data;
},
(error) => {
  console.error('Error loading data: ', error);
  // Handle the error (e.g., show an error message or retry the request)
}
);
  }
}
