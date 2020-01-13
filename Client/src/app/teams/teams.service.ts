import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAllUsers(pseudo:string) {
    return this.http.get(this.config.serverUrl + '/users', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      }),
      params: new HttpParams().set('pseudo', '%' + pseudo + '%')
    })
  }

  addUserToTeam(user_id, team_id, profile) {
   return this.http.post(this.config.serverUrl + '/teammembers', {user_id: user_id, team_id:team_id, profile:profile},{
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }

  deleteUserFromTeam(user_id, team_id) {
    return this.http.delete(this.config.serverUrl + '/teammembers/' + team_id + "/" + user_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }
}
