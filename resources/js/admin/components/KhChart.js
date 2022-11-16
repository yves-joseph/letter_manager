/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */


import AlertDialog from "./AlertDialog";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export class KhChart {
    constructor(className = 'kh-chart-item-content') {
        this.chartItemContent = document.getElementsByClassName(className);

        if (this.chartItemContent.length > 0) {

            for (let i = 0; i < this.chartItemContent.length; i++) {
                const
                    label = this.chartItemContent.item(i).dataset.label ?? 'label',
                    type = this.chartItemContent.item(i).dataset.type ?? 'type',
                    _data = JSON.parse(this.chartItemContent.item(i).dataset.data ?? '[]'),
                    /**
                     * @var {CanvasRenderingContext2D} ctx
                     */
                    ctx = this.chartItemContent.item(i).getContext('2d');

                /**
                 * @var {Chart} baseChart
                 */
                let baseChart = new Chart(ctx, {
                    type: type,//pie,doughnut
                    data: {
                        labels: _data.labels,
                        datasets: [{
                            label:label,
                            data: _data.values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 108, 34, 0.2)',
                                'rgb(90,229,44,0.2)',
                                'rgb(214,18,236,0.2)',
                                'rgb(225,160,74,0.2)',
                                'rgb(121,217,144,0.2)',
                                'rgb(114,102,150,0.2)',
                                'rgb(101,6,46,0.2)',
                                'rgb(134,104,4,0.2)',
                                'rgb(252,4,4,0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 108, 34, 1)',
                                'rgb(90,229,44,1)',
                                'rgb(214,18,236,1)',
                                'rgb(225,160,74,1)',
                                'rgb(121,217,144,1)',
                                'rgb(114,102,150,1)',
                                'rgb(101,6,46,1)',
                                'rgb(134,104,4,1)',
                                'rgb(252,4,4,1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive:false,
                       /* scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },*/
                        onClick: (e,context)=>{
                           if (context[0]){
                               const _alert= new AlertDialog();
                               _alert.yesOnly=true;
                               _alert.yes="OK";
                               _alert.header=label;
                               //console.log(context[0])
                               _alert.massage=`Le site enrégistre pour <strong style="color: #28a745;">${_data.labels[context[0].index]}</strong>, <strong style="color: #28a745;">${_data.values[context[0].index]}</strong> utilisateur(s)`;
                               _alert.show();
                           }
                        }
                    }
                });
            }

        }
    }

}
