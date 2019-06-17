import { LightningElement } from 'lwc';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {loadScript} from 'lightning/platformResourceLoader';
import chart from '@salesforce/resourceUrl/chart';


export default class UseThirdPartyLib extends LightningElement {
    myChart;
    initializeChartJS = false;

    config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',//red
                    'rgb(255, 159, 64)',//orange
                    'rgb(255, 205, 86)',//yellow
                    'rgb(75, 192, 192)',//green
                    'rgb(54, 162, 235)',//blue
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    renderedCallback(){        
        if(this.initializeChartJS){
            return;
        }
        this.initializeChartJS = true;
        
        loadScript(this,chart)
            .then(()=>{                        
                const contxt = this.template.querySelector("canvas.girikonChart").getContext('2d');        
                this.myChart = new window.Chart(contxt,this.config);
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title:"Error",
                    type:"error",
                    message:error
                })
                );
            })
    }

    
    randomScalingFactor(){
        return Math.round(Math.random() * 100);
    }
}