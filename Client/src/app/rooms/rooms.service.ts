import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient, private config: ConfigService, private authService: AuthentificationService) { }

  getRooms() {
    return this.http.get(this.config.serverUrl + '/rooms', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }
}
