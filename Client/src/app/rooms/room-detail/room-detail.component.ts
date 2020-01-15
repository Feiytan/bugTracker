import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavService } from 'src/app/my-nav/nav.service';
import { RoomsService } from '../rooms.service';
import { Ticket } from '../ticket';
import { TicketService } from './ticket.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  private subToRoute: Subscription
  private room_id: number
  private toDoTickets: Ticket[]
  private inProgressTickets: Ticket[]
  private doneTickets: Ticket[]
  private subToNewTicket: Subscription

  constructor(private route: ActivatedRoute, private navService: NavService, private roomService: RoomsService, private ticketService: TicketService) { }

  ngOnInit() {
    
    this.subToRoute = this.route.params.subscribe(params => {
      this.room_id = params['id']
      this.navService.currentPageObservable.next('Room ' + this.room_id)
    })

    this.roomService.getTicketsForRoom(this.room_id).subscribe(
      (tickets: Ticket[]) => {
        this.toDoTickets = tickets.filter(ticket => ticket.status === 'todo')
        this.inProgressTickets = tickets.filter(ticket => ticket.status === 'inprogress')
        this.doneTickets = tickets.filter(ticket => ticket.status === 'done')
      },
      error => {
        console.log(error)
      }
    )

    this.subToNewTicket = this.ticketService.newTicket.subscribe(
      (response : Ticket) => {
          this.toDoTickets.push(response)
      }
    )
  }

  setToInProgress(ticket: Ticket) {
    this.ticketService.patch('inprogress', ticket.ticket_id).subscribe(
      () => {
        this.inProgressTickets.push(this.toDoTickets.splice(this.toDoTickets.indexOf(ticket), 1)[0])
      },
      error => {
        console.log(error)
      }
    )
  }

  setToToDo(ticket: Ticket) {
    this.ticketService.patch('todo', ticket.ticket_id).subscribe(
      () => {
        this.toDoTickets.push(this.inProgressTickets.splice(this.inProgressTickets.indexOf(ticket), 1)[0])
      },
      error => {
        console.log(error)
      }
    )
  }

  setToDone(ticket: Ticket) {
    this.ticketService.patch('done', ticket.ticket_id).subscribe(
      () => {
        this.doneTickets.push(this.inProgressTickets.splice(this.inProgressTickets.indexOf(ticket), 1)[0])
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnDestroy() {
    this.subToRoute.unsubscribe()
    this.subToNewTicket.unsubscribe()
  }
}
