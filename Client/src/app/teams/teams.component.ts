import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(private navService: NavService) {
  }
  
  ngOnInit() {
    this.navService.currentPageObservable.next('Teams')
  }

}
