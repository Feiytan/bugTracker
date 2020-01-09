import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private navService : NavService) { }

  ngOnInit() {
    this.navService.currentPageObservable.next('Profile')
  }

}
