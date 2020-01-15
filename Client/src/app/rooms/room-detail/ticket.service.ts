import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';
import { AuthentificationService } from 'src/app/authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private config: ConfigService, private authService: AuthentificationService) { }

  patch(newValue: string, ticket_id: number) {
    return this.http.patch(this.config.serverUrl + '/tickets/' + ticket_id, {status: newValue}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token
      })
    })
  }
}
