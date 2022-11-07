import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Нажмите на одну из кнопок';

  get isLoggedIn() {
    return localStorage.getItem('currentUser') != null
  }

  doLogout(): void {
    console.log("Logout")
    localStorage.removeItem('currentUser')
  }
}
