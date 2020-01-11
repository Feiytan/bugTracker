import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthentificationService } from '../authentification.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  private signupForm: FormGroup
  private emailError: string
  private passwordsMatch:boolean = false
  private loading:boolean = false

  constructor(private authentificationService : AuthentificationService, private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pseudo: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null)
    })
  }

  checkIfPasswordsMatch() : void {
    if (this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      this.passwordsMatch = true
      this.signupForm.get('confirmPassword').setErrors(null)
    } else {
      this.passwordsMatch = false
      this.signupForm.get('confirmPassword').setErrors({message: 'Wrong Password'})
    }
  }

  onSubmit() {
    this.loading = true;
    this.authentificationService.signup({
      pseudo: this.signupForm.value.pseudo,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }).subscribe(
      response => {
        console.log(response['response'])
        this.authentificationService.userSubject.next(new User(this.signupForm.value.pseudo, response['jwt']))
      },
      error => {
        this.signupForm.get('email').setErrors(error)
        this.emailError = error.error.message
        this.loading = false

      },
      () => {
        this.loading = false
        this.router.navigate(['/', 'rooms'])
      }
    )
  }

  resetError() {
    if(this.emailError) {
      this.emailError = null
    }
  }

}
