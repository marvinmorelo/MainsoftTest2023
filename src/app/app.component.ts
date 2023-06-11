import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MainsoftTest2023';

constructor(public authService:AuthService){}

  logout() {
    this.authService.logout();
  }
}
