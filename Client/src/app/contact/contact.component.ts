import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private navService : NavService) { }

  ngOnInit() {
    this.navService.currentPageObservable.next('Contact')
  }

}
