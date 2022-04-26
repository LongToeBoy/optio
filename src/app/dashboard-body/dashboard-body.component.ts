import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';

const AGGREGATE_URL="https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/aggregate";

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})

export class DashboardBodyComponent implements OnInit{
  donutOptions:any;
  heatmapOptions:any;
  linechartOptions:any;
  tableOptions:any;
  
  selectedTab:number=0;
  constructor(private http:HttpClient, config: NgbNavConfig) {
    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }
  ngOnInit():void{
    this.generateDonutOptions();
    this.generateHeatmapOptions();
  }
  getpostBody(dimension:any,types:any,metrics:any,gteDate:any,lteDate:any){
    return{
      "dimension": dimension,
      "types": types,
      "gteDate": gteDate,
      "lteDate": lteDate,
      "includeMetrics": metrics
    }
  }
  generateDonutOptions(){
    let postBody:any=this.getpostBody("category",["spending","withdrawal"],["volume"],"2018-01-01","2018-01-31");
    
    this.http.post(AGGREGATE_URL,postBody).subscribe((response:any)=>{
      let dataForList:any=[];
      response.data.forEach((data: any) => {
        let objForChart:any={
          value:Math.round(data.volume as number),
          name:data.dimension
        }
        dataForList.push(objForChart);
      });
      dataForList=dataForList.sort((a:any,b:any)=>{return a.value <= b.value});
      let options = {
      
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'ხარჯების კატეგორიები და განაწილება',
            type: 'pie',
            radius: [100, 250],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: dataForList
          }
        ]
      };
      this.donutOptions=options;
    });
    
  }
  generateHeatmapOptions(){
    let data:any=[];
    let xAxis:any=[];
    for(let i=1;i<31;i++){
      xAxis.push(i);
      let gteDate="2018-01-";
      gteDate+=String(i).padStart(2,'0');
      let postBody:any=this.getpostBody("category",["spending","withdrawal"],["volume", "quantity"],gteDate,gteDate);
      this.http.post(AGGREGATE_URL,postBody).subscribe((response:any)=>{
        let dataForList:any=[];
        response.data.forEach((data: any) => {
          dataForList.push({
            name:data.dimension,
            volume:data.volume,
            quantity:data.quantity
          });
        });
        data.push(dataForList);
       // console.log(data);
      });
    }
    setTimeout(()=>{
    let yAxis=data[0].map((dataPoint:any)=>{return dataPoint.name});
    let volumeData:any=[];
    let quantityData:any=[];
    yAxis.forEach((clientName:any,y:number) => {
      xAxis.forEach((e:any,x:number) => {
        let curData=data[x].find((dataPoint:any)=>dataPoint.name==clientName);
        volumeData.push([x,y,curData?curData.volume:"-"]);
        quantityData.push([x,y,curData?curData.quantity:"-"]);
      });
    });
    let onlyVols=volumeData.map((e:any)=>{return e[2]}).sort((a:any,b:any)=>a<b);
    let onlyQuants=quantityData.map((e:any)=>{return e[2]}).sort((a:any,b:any)=>a<b);
    let volumeOptions=this.genHeatOptions(volumeData,yAxis,xAxis,onlyVols[0],onlyVols[onlyVols.length-1]);
    let quantityOptions=this.genHeatOptions(quantityData,yAxis,xAxis,onlyQuants[0],onlyQuants[onlyQuants.length-1]);;
    this.heatmapOptions=[volumeOptions,quantityOptions];
  },6000);
  }
  genHeatOptions(data:any,yAxis:any,xAxis:any,minVal:any=0,maxVal:any=100):any{

    let option = {
      tooltip: {
        position: "top",
        formatter: function (p: any) {
          return  `(${yAxis[p.data[1]]}: ${p.data[0]+1}) → ${p.data[2]}`;
        }
      },
      animation: false,
      grid: {
        height: "50%",
        top: "10%"
      },
      xAxis: {
        type: "category",
        data: xAxis,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: "category",
        data: yAxis,
        orient: "horizontal",
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: minVal,
        max: maxVal,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "2%"
      },
      series: [{
        name: "ხარჯვის ინტენსივობა დღეების მიხედვით",
        type: "heatmap",
        data: data
      }]
    }
    return(option);
  }
  generateLinechartOptions(){

  }
  generateTableOptions(){

  }
}

