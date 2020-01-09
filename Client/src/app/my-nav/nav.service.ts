import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavService {
  currentPageObservable = new Subject()
  constructor() { }
}
