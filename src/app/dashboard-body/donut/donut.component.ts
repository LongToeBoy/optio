import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import * as echarts from 'echarts';

const AGGREGATE_URL="https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/aggregate";

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {
  myChart:echarts.ECharts;
  @Input("chartOptions") options:any;
  constructor() {
  }

  ngOnInit(): void {
    this.myChart=echarts.init(document.getElementById("donutChartDom")as HTMLElement);
    this.myChart.setOption(this.options);
  }
  
}
