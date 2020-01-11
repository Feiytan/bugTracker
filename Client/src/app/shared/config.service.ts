import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  serverUrl = 'http://www.localhost:8000'
  constructor() { }
}
