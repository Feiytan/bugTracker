import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { ConfigService } from '../shared/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient, private config : ConfigService) { }

  signin(user) {
    return this.http.post(this.config.serverUrl + '/users', user)
  }
}
