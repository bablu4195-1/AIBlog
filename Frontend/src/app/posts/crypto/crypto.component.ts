import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { CryptosocketService } from 'src/app/services/socket/cryptosocket.service';
import 'chartjs-adapter-date-fns';
import { Subscription } from 'rxjs/internal/Subscription';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  graphData: any = {};
  private cryptoSub?: Subscription;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'BTC',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            // millisecond: 'MMM dd',
            // second: 'MMM dd YYYY',
            // minute: 'MMM dd',
            // hour: 'MMM dd',
            // day: 'MMM dd',
            // week: 'MMM dd',
            // month: 'MMM dd',
            // quarter: 'MMM dd',
            // year: 'MMM dd',
            year: 'YYYY mm dd HH:mm:ss',
          }
        }
      },
    },
  };

  public lineChartLegend = true;

  constructor(private cryptoService: CryptosocketService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.displayGraph();
  }

  displayGraph() {
    const maxDataPoints = 10;  // Maximum number of data points to display at once

    this.cryptoSub = this.cryptoService.displayGraph().pipe(
      throttleTime(2000)
    ).subscribe((data: any) => {
      const btcPrice = parseFloat(data.BTC);
      const timestamp = new Date();
      let existingLabels = this.lineChartData.labels || [];
      let existingData = this.lineChartData.datasets[0].data || [];
      // If the arrays are full, remove the first element
      if (existingLabels.length >= maxDataPoints) {
        existingLabels.shift();
        existingData.shift();
      }
      this.lineChartData = {
        labels: [...existingLabels, timestamp],
        datasets: [
          {
            ...this.lineChartData.datasets[0],
            data: [...existingData, btcPrice]
          }
        ],
      };

      // Update the chart
      // this.lineChartData.labels = existingLabels;
      // this.lineChartData.datasets[0].data = existingData;
      this.cd.detectChanges();
    });
  }


}
