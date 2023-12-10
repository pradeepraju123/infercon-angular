import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.css']
})
export class ServiceAdminComponent {
  isCardView = true;
  toggleView() {
    this.isCardView = !this.isCardView;
  }
  constructor(private router: Router) { }
  redirectToCreateServices() {
    this.router.navigate(['/app-add-services']); // Navigate to the 'Add services' component
  }
}
