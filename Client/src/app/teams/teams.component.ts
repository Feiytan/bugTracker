import { Component, OnInit } from '@angular/core';
import { NavService } from '../my-nav/nav.service';
import { TeamsService } from './teams.service';
import { Router } from '@angular/router';
import { Team } from './team';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map, take, skip, debounceTime, filter, distinct, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeamUser } from './teamUser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  private teams : Team[]
  newMemberNameControl = new FormControl();
  filteredOptions: Observable<TeamUser[]>;
  users: TeamUser[] = new Array()
  newUser
  newUserGroup:FormGroup

  constructor(private navService: NavService, private teamsService : TeamsService, private router : Router) { 

    this.teamsService.getTeamsForUser().subscribe(
      (response : Team[]) => {
        this.teams = response
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
    this.newUserGroup = new FormGroup({
      newMemberNameControl: new FormControl(null),
      newMemberProfileControl: new FormControl(null)
    })
    this.navService.currentPageObservable.next('Teams')
    this.newUserGroup.controls.newMemberNameControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( value => {
      if (value === '') {
        this.users = new Array()
      } else {
        this.filter(value)
      }
    })
    this.newUserGroup.controls.newMemberNameControl.valueChanges.subscribe( _ => this.newUser = null)
  }

  private filter(value: string): void{
    this.teamsService.getAllUsers(value).subscribe(
      (response : TeamUser[]) => {
        this.users = response
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('complete')
      }
    )
  }

  private setNewUser(user:TeamUser) {
    this.newUser = user
  }

  private addNewMember(team:Team) {
    this.teamsService.addUserToTeam(this.newUser.id, team.team_id, this.newUserGroup.value.newMemberProfileControl).subscribe(
      _ => {
        team.members.push(new TeamUser(this.newUser.id, this.newUser.pseudo, this.newUserGroup.value.newMemberProfileControl))
        this.newUserGroup.reset()
      },
      error => {
        console.log(error)
      }
    )
  }

  private deleteUser(team : Team, user) {
    this.teamsService.deleteUserFromTeam(user.user_id, team.team_id).subscribe(
      _ => {
        team.members = team.members.filter(member => {
          return member.user_id !== user.user_id
        })
      },
      error => {
        console.log(error)
      }
    )
  }
}
