import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private router: Router;
  message: string;

  loginForm = new FormGroup({
      login: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
      pass: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(30) ])
    })

  constructor(private r: Router) {
    this.router = r;
    this.message = ""
  }

  ngOnInit(): void {
  }

  get login() {
	  return this.loginForm.get('login')
  }

  get pass() {
	  return this.loginForm.get('pass')
  }

  doLogin(): void {
      let json = localStorage.getItem("users")
      let users = json != null ? JSON.parse(json) : []

      for( var u of users ) {
        if( u.email == this.login?.value && u.password == this.pass?.value ) {
          localStorage.setItem("currentUser", u.login)

          this.router.navigate(['/list']);
        }
      }

      this.message = "Пользователь не найден"
  }

}
