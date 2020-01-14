import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-new-team-form',
  templateUrl: './new-team-form.component.html',
  styleUrls: ['./new-team-form.component.css']
})
export class NewTeamFormComponent implements OnInit {

  private name = new FormControl('', Validators.required)
  constructor(private teamsService : TeamsService) { }

  ngOnInit() {
  }

  addTeam() {
    this.teamsService.newTeam.next(this.name.value)
    this.name.reset()
    this.name.setErrors(null)
  }
}
