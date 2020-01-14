import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../my-nav/nav.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {


  private isWeb : boolean
  private subtoBreakPoints: Subscription

  isWebObserver$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
  .pipe(
    map(result => result.matches),
    shareReplay()
  )
  
  constructor( private route : ActivatedRoute, private navService : NavService, private breakpointObserver: BreakpointObserver) {
    this.subtoBreakPoints = this.isWebObserver$.subscribe(response => {
      this.isWeb = response
    })
  }

  ngOnInit() {
    this.navService.currentPageObservable.next('Rooms')
  }

  ngOnDestroy(): void {
    this.subtoBreakPoints.unsubscribe()
  }

}
