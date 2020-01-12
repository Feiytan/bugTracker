import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';
import { TeamsService } from './teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(private navService: NavService, private teamsService : TeamsService, private router : Router) {
    this.teamsService.getTeamsForUser().subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
        this.router.navigate(['/', 'auth'])
      },
      () => {
        console.log('complete')
      }
    )
  }
  
  ngOnInit() {
    this.navService.currentPageObservable.next('Teams')
  }

}
