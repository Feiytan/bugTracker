import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})

export class MyNavComponent implements OnDestroy{


  @ViewChild('drawer', {static: false}) private drawer : MatSidenav

  isWebObserver$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  private subtoBreakPoints : Subscription
  private subToRoute: Subscription
  private subToNavigation: Subscription
  private isWeb : boolean
  private pageName: string

  constructor(private breakpointObserver: BreakpointObserver, private activatedRoute: ActivatedRoute, private navService: NavService) {
    this.subtoBreakPoints = this.isWebObserver$.subscribe(response => {
      this.isWeb = response
    })

    this.navService.currentPageObservable.subscribe({
      next: (pageName:string) => {
        this.pageName = pageName
      }
    })
  }

  navigate() {
    if(!this.isWeb) {
      this.drawer.toggle()
      if(document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  }

  ngOnDestroy(): void {
    this.subtoBreakPoints.unsubscribe()
    this.subToRoute.unsubscribe()
    this.subToNavigation.unsubscribe()
  }
}
