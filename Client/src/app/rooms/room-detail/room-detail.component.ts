import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavService } from 'src/app/my-nav/nav.service';
import { RoomsService } from '../rooms.service';
import { Ticket } from '../ticket';

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

  constructor(private route: ActivatedRoute, private navService: NavService, private roomService: RoomsService) { }

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
      },
      () => {
        console.log(this.toDoTickets)
        console.log(this.inProgressTickets)
        console.log(this.doneTickets)
      }
      
    )
  }

  setToInProgress(ticket: Ticket) {
    this.inProgressTickets.push(this.toDoTickets.splice(this.toDoTickets.indexOf(ticket), 1)[0])
  }

  ngOnDestroy() {
    this.subToRoute.unsubscribe()
  }
}
