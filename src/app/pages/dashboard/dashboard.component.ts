import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authService = inject(AuthService);
  title: string;
  constructor() {
    this.title = "Dashboard";
  }

  ngOnInit() {
    this.authService.getUserDetails().then(data => console.log(data?.name));
  }

  public logout() {
    localStorage.removeItem("user-email");
    window.location.reload();
  }
}
