import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from '@angular/router';
import {
  ApexTitleSubtitle,
  ApexMarkers,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { EChartOption } from 'echarts';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RepositoryService } from 'src/app/services/repository.service';
export type chartOptions = {
  series: ApexAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  plotOptions: ApexPlotOptions;
  labels: string[];
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
  user: '';
  loading: boolean;
  dataSource2: any;
  dataSource3; any;
  dataSource4: any;

  // line chart
  line_chart: EChartOption = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25'
    },
    xAxis: {
      data: ['0900', '0930', '1000', '1030', '1100'],
      axisLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac'
      }
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis'
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac'
      }
    },
    series: [
      {
        name: 'Temperature',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        data: [15, 22, 14, 31, 17, 41],
        symbolSize: 10
        // color: ["#FF8D60"]
      },
      {
        name: 'Humidity',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        symbolSize: 10,
        // size: 10,
        data: [8, 12, 28, 10, 10, 12]
        // color: ["#009DA0"]
      }
    ],
    color: ['#3FA7DC', '#F6A025']
  };

  constructor(
    private repository: RepositoryService,
  ) { }

  ngOnInit(): void {
  }
}
