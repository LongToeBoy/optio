import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
const AGGREGATE_URL="https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/aggregate";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  myChart:echarts.ECharts;
  @Input("chartOptions") options:any;
  displayIndex=0;
 
  
  
  
  constructor(public http:HttpClient) {
   }

 
  
  ngOnInit(): void {
    this.myChart=echarts.init(document.getElementById("heatMapDom") as HTMLElement);
    this.setOption(0);
    
  }
  setOption(index:number){
    this.myChart.setOption(this.options[index]);
  }
  
  
}
