import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/teams/team';
import { TeamsService } from 'src/app/teams/teams.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  private isWeb : boolean
  private subtoBreakPoints: Subscription
  private newRoomFormGroup: FormGroup
  private teams: Team[]
  private selectedTeam: Team

  isWebObserver$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
  .pipe(
    map(result => result.matches),
    shareReplay()
  )

  constructor(private breakpointObserver: BreakpointObserver, private teamsService: TeamsService) {
    this.subtoBreakPoints = this.isWebObserver$.subscribe(response => {
      this.isWeb = response
    })
   }

  ngOnInit() {
    this.newRoomFormGroup = new FormGroup({
      roomName: new FormControl('', Validators.required),
      teamName: new FormControl('', Validators.required)
    })
    this.teamsService.getTeamsForUser().subscribe(
      (response: Team[]) => {
        this.teams = response
      }
    )
  }

  ngOnDestroy(): void {
    this.subtoBreakPoints.unsubscribe()
  }

  addRoom() {
    console.log(this.newRoomFormGroup)
  }

}
