import { Component, OnInit } from '@angular/core';
import {Dashboard} from '../../Dto/dashboard';
import {ManagerService} from '../../_services/manager.service';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard[]=[];
  month: string[] = [];
  count: number[] = [];
  game: number[] = [];

  // chartData = [
  //   {
  //     data: this.count,
  //     label: 'Statistics of subscribers in the month'
  //   }
  // ];
  // chartLabels = this.month;
  // chartOptions = {
  //   responsive: true
  // };


  private canvas: any;
  private ctx: any;
  constructor(private managerService: ManagerService) {
  }

  ngOnInit(): void {

    this.countUser();
    this.time();
    this.countGame()
    setTimeout(() => {
          this.chart();
        },
        300);
  }
  // getInfor(){
  //   return this.managerService.dashboard().subscribe(data=>{
  //     // this.dashboard=data.map(item => { return new IssuePoker().deserialize(item)});
  //     this.dashboard=data;
  //     this.idUser=data;
  //     this.url=data;
  //     for(let i=0; i< data.length;i++){
  //       this.month[i] = data[i].url;
  //       this.count[i] = data[i].idUser;
  //       console.log("1:",this.idUser);
  //       console.log("2:",this.url);
  //     }
  //     console.log('data: ',data);
  //   });
  //
  // }

  countGame(){
    return this.managerService.game().subscribe(data=>{
      this.game=data;
    });
  }
  countUser(){
    return this.managerService.count().subscribe(data=>{
      this.count=data;
    });
  }
  time(){
    return this.managerService.month().subscribe(data=>{
      this.month=data;
    });
  }
  chart(){
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.month,
        datasets: [{
          label: 'User',
          data: this.count,
          backgroundColor: ['rgb(10,231,231, 0.1)'],
          borderWidth: 1
        },
          {
          label: 'Game',
          data: this.game,
          backgroundColor: ['rgba(255, 10, 13, 0.1)'],
          borderWidth: 1
        }
        ]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        // display:true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
