import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router
import { ServicesdataService } from '../../services/servicesdata.service';
@Component({
  selector: 'app-services-tableview',
  templateUrl: './services-tableview.component.html',
  styleUrls: ['./services-tableview.component.css']
})
export class ServicesTableviewComponent {
  servicesdata: any[]=[]; // Define a property to store the fetched data

  constructor(private servicedataService: ServicesdataService, private router: Router) { };
  editServices(serviceId: String) {
    this.router.navigate(['/app-edit-services', serviceId]);  // Navigate to the edit component with the ID
  }

  ngOnInit(): void {
    this.servicedataService.getAllServicesdata().subscribe((data: any) => {
      this.servicesdata = data.data;
    });
  }
}
