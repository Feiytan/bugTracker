import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { Ticket } from '../../ticket';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-ticket-form',
  templateUrl: './new-ticket-form.component.html',
  styleUrls: ['./new-ticket-form.component.css']
})
export class NewTicketFormComponent implements OnInit {

  private newTicketFormGroup: FormGroup
  private subToRoute: Subscription
  private room_id: number

  constructor(private ticketService: TicketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.newTicketFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
    this.subToRoute = this.route.params.subscribe(params => {
      this.room_id = params['id']
    })
  }

  addTicket(form: NgForm) {
    this.ticketService.addTicket(this.room_id, this.newTicketFormGroup.value.content, this.newTicketFormGroup.value.title).subscribe(
      (response : any) => {
        this.ticketService.newTicket.next(new Ticket(response.insertId, this.newTicketFormGroup.value.title, this.newTicketFormGroup.value.content, 'todo', this.room_id))
      },
      error => {
        console.log(error)
      },
      () => {
        form.resetForm()
      }
    )
  }

}
