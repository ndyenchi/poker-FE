import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input("count") count: number[]=[];
  @Input("month") month: string[]=[];
  chartData = [
    {
      data: this.count,
      label: 'Statistics of subscribers in the month'
    }
  ];
  chartLabels = this.month;
  chartOptions = {
    responsive: true
  };
  constructor() { }

  ngOnInit(): void {
    console.log("chi chi",this.month)
  }

}
