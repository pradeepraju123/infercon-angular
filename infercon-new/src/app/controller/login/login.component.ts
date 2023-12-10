import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const token = response.access_token;
        localStorage.setItem('authToken', token);
        this.authService.setToken(response.access_token);
        this.errorMessage = null;

        this.router.navigate(['dashboard']);
      },
      (error) => {
        if (error.status === 401 && error.error.message === 'Token expired') {
          this.authService.clearToken();
          this.errorMessage = 'Token expired. Please log in again.';
        } else {
          this.authService.clearToken();
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      }
    );
  }
}
