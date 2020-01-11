import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { User } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  private loading : boolean = false
  error : boolean = false

  constructor(private authentificationService : AuthentificationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true
    this.authentificationService.signin({email: this.signinForm.value.email, password: this.signinForm.value.password}).subscribe(
      result => {
        this.error = false
        this.authentificationService.userSubject.next(new User(result['pseudo'], result['jwt']))
      },
      error => {
        if(this.error === false) {
          this.error = true
        }
        this.loading = false
      },
      () => {
        this.loading = false
      }
    )
  }

}
