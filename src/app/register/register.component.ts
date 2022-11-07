import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  message: string;

  dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = new Date("1950-01-01")
    const end = new Date("2021-01-01")

    if( this.registerForm != null && this.birthday?.value != null ) {
      let bd = new Date( this.birthday.value )

      console.log("bd: " + bd + ", value: [" + this.birthday.value + "]")
      console.log("start: " + start + ", end: " + end)

      return bd >= start && bd <= end ? null : { notInRange: true }
    }

    return { notInRange: true }
  }

  samePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if( this.registerForm != null && this.pass1 != null && this.pass2 != null ) {
      console.log("p1: " + this.pass1.value + ", p2: " + this.pass2.value)

      if( this.pass1.value === this.pass2.value ) {
        this.pass1.setErrors(null)
        this.pass2.setErrors(null)

        return null;
      } else {
        this.pass1.setErrors( { missmatch: true } )
        this.pass2.setErrors( { missmatch: true } )
      }
    }

    return { missmatch: true }
  }

  registerForm = new FormGroup({
      userName: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ]),
      surname: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(15) ]),
      patronymic: new FormControl(''),
      email: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
      pass1: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(30), this.samePassword ]),
      pass2: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(30), this.samePassword  ]),
      birthday: new FormControl('', [ Validators.required, this.dateValidator ]),
      gender: new FormControl(''),
  })

  constructor() {
    this.message = ''
  }

  ngOnInit(): void {
  }

  get userName() {
	  return this.registerForm.get('userName')
  }

  get surname() {
	  return this.registerForm.get('surname')
  }

  get patronymic() {
	  return this.registerForm.get('patronymic')
  }

  get email() {
	  return this.registerForm.get('email')
  }

  get pass1() {
	  return this.registerForm.get('pass1')
  }

  get pass2() {
	  return this.registerForm.get('pass2')
  }

  get birthday() {
	  return this.registerForm.get('birthday')
  }

  get gender() {
	  return this.registerForm.get('gender')
  }

  doRegister(): void {
    let json = localStorage.getItem("users")
    let users = json != null ? JSON.parse(json) : []

    for( var u of users ) {
      if( u.email == this.email ) {
        this.message = 'Пользователь с таким e-mail уже существует'
        return
      }
    }

    users.push({
      name: this.userName?.value,
      surname: this.surname?.value,
      patronymic: this.patronymic?.value,
      email: this.email?.value,
      password: this.pass1?.value,
      birthday: this.birthday?.value,
      gender: this.gender?.value
    })

    console.log("New user added: " + users[users.length - 1])

    json = JSON.stringify(users)
    localStorage.setItem( "users", json )

    this.message = 'Пользователь зарегистрирован'
  }
}
