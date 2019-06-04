import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
    selector: 'trends',
    templateUrl: './trends.component.html',
    styleUrls: ['./trends.component.css']
})
export class TrendsComponent {

    @ViewChild('charts') public chartEl: ElementRef;
    data: any = [];
    constructor(private highcharts: ProfileService, public service: ProfileService) { }
    ngOnInit() {
        
        this.service.findMonthWiseReport().subscribe(
            (data: any) => {
                this.service.months.forEach(month => {
                    let value = data.find(o => o.mon === month);
                    let value1 = value ? value.count : 0;
                    this.data.push(value1);
                });
                console.log(data);
                this.highcharts.createChart(this.chartEl.nativeElement, this.myOptions);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    myOptions = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Report (2019)'
        },
        xAxis: {
            categories: this.service.months
        },
        yAxis: {
            min: 0,
            title: {
                text: 'User Added'
            }
        },
        legend: {
            reversed: true
        },
        colors:['#ef3b3a'],
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Users',
            data: this.data
        }]
    };

}