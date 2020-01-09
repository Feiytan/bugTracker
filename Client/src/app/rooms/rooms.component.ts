import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../my-nav/nav.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor( private route : ActivatedRoute, private navService : NavService) { }

  ngOnInit() {
    this.navService.currentPageObservable.next('Rooms')
  }

}
