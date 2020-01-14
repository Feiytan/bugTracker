import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {

  @Input() room_id: string;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.room_id)
    var myDoughnutChart = new Chart(this.room_id, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 10, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'To do',
          'In progress',
          'Finish'
        ],
      },
      options: Chart.defaults.doughnut
    });
  }
}
