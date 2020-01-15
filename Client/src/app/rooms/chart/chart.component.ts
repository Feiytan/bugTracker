import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js'
import { RoomsService } from '../rooms.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnInit {


  @Input() room_id: string;
  private tickets: Ticket[]

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    this.roomsService.getTicketsForRoom(this.room_id).subscribe(
      (response: Ticket[]) => {
        this.tickets = response
      },
      error => {
        console.log(error)
      },
      () => {
        if(this.tickets.length > 0) {
          var myDoughnutChart = new Chart(this.room_id, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [this.tickets.filter(ticket => ticket.status === 'todo').length, this.tickets.filter(ticket => ticket.status === 'inprogress').length, this.tickets.filter(ticket => ticket.status === 'done').length],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(54, 162, 235, 0.7)'
                ],
              }],
              labels: [
                'To do',
                'In progress',
                'Done'
              ],
            },
            options: Chart.defaults.doughnut
          });
          
        } else {
          var myDoughnutChart = new Chart(this.room_id, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [1],
                backgroundColor: [
                  'rgba(255, 255, 255, 0.3)',
                ],
              }],
              labels: [
                'No tickets'
              ],
            },
            options: Chart.defaults.doughnut
          });
        }

      })
  }
}
