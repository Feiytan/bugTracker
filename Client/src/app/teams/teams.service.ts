import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http : HttpClient, private config : ConfigService, private authService : AuthentificationService) { }

  getTeamsForUser() {
    return this.http.get(this.config.serverUrl + '/teams', {
      headers:  new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }
}
