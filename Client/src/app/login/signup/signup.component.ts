import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  private signupForm: FormGroup

  private passwordsMatch:boolean = false

  constructor() {
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
    console.log(this.signupForm)
  }

}
