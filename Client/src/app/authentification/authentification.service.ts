import { Injectable, OnDestroy } from '@angular/core';
import { Config } from 'protractor';
import { ConfigService } from '../shared/config.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService implements OnDestroy{


  public userSubject = new Subject<User>();
  private userSubscription : Subscription
  
  constructor(private http : HttpClient, private config : ConfigService) { 
    this.userSubscription = this.userSubject.subscribe((user : User | null) => {
      if(user !== null) {
        localStorage.setItem('token', user.token)
        localStorage.setItem('pseudo', user.pseudo)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('pseudo')
      }
    })
  }
  
  signup(user) {
    return this.http.post(this.config.serverUrl + '/users', user)
  }

  signin(user) {
    return this.http.post(this.config.serverUrl + '/users/login', user)
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
