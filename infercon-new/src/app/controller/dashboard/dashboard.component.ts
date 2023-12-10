import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[]=[]; // Define a property to store the fetched data

  constructor(private userService: UserService) { };

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }
}
