import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { AuthentificationService } from '../authentification/authentification.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  newRoom = new Subject

  constructor(private http: HttpClient, private config: ConfigService, private authService: AuthentificationService) { }

  getRooms() {
    return this.http.get(this.config.serverUrl + '/rooms', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }

  getTicketsForRoom(room_id) {
    return this.http.get(this.config.serverUrl + '/tickets/' + room_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }

  deleteTeam(room_id) {
    return this.http.delete(this.config.serverUrl + '/rooms/' + room_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }
}
