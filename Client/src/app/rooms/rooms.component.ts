import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../my-nav/nav.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { RoomsService } from './rooms.service';
import { Room } from './room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {


  private isWeb : boolean
  private subtoBreakPoints: Subscription
  private rooms: any
  private newRoomSubscription: Subscription

  isWebObserver$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
  .pipe(
    map(result => result.matches),
    shareReplay()
  )

  constructor( private route : ActivatedRoute, private navService : NavService, private breakpointObserver: BreakpointObserver, private roomsService: RoomsService) {
    this.subtoBreakPoints = this.isWebObserver$.subscribe(response => {
      this.isWeb = response
    })
  }

  ngOnInit() {
    this.navService.currentPageObservable.next('Rooms')
    this.roomsService.getRooms().subscribe(
      (result) => {
        this.rooms = result
        console.log(this.rooms)
      },
      error => {
        console.log(error)
      }
    )

    this.newRoomSubscription = this.roomsService.newRoom.subscribe(
      (newRoom: Room) => {
        this.rooms.push(newRoom)
      }
    )
  }
  
  deleteRoom(room_id) {
    this.roomsService.deleteTeam(room_id).subscribe(
      _ => {
        this.rooms = this.rooms.filter(room => room.room_id != room_id)
      },
      error => {
        console.log(error)
      }
      )
    }
    
    ngOnDestroy(): void {
      this.subtoBreakPoints.unsubscribe()
      this.newRoomSubscription.unsubscribe()
    }
}
