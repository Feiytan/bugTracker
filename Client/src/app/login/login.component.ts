import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../my-nav/nav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  isWebObserver$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
  .pipe(
    map(result => result.matches),
    shareReplay()
  )
    
  private isWeb: boolean
  private subtoBreakPoints: Subscription
  
  constructor(private navService: NavService, private breakpointObserver: BreakpointObserver) {
    this.subtoBreakPoints = this.isWebObserver$.subscribe(response => {
      this.isWeb = response
      console.log(this.isWeb)
    })
  }
    
  ngOnInit(): void {
    this.navService.currentPageObservable.next('Login')
  }
          
  ngOnDestroy(): void {
    this.subtoBreakPoints.unsubscribe()
  }
}
