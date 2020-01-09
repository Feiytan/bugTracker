import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.currentPageObservable.next('Login')
  }

}
