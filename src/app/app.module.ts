import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { WhoamiComponent } from './whoami/whoami.component';
import { DonutComponent } from './dashboard-body/donut/donut.component';
import { HeatmapComponent } from './dashboard-body/heatmap/heatmap.component';
import { LinechartComponent } from './dashboard-body/linechart/linechart.component';
import { TableComponent } from './dashboard-body/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavbarMainComponent,
    DashboardBodyComponent,
    WhoamiComponent,
    DonutComponent,
    HeatmapComponent,
    LinechartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
