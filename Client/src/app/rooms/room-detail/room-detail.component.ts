import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavService } from 'src/app/my-nav/nav.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  private subToRoute: Subscription
  private room_id: number

  constructor(private route: ActivatedRoute, private navService: NavService) { }

  ngOnInit() {
    
    this.subToRoute = this.route.params.subscribe(params => {
      this.room_id = params['id']
      this.navService.currentPageObservable.next('Room ' + this.room_id)
    })
  }

  ngOnDestroy() {
    this.subToRoute.unsubscribe()
  }
}
