import { LightningElement,track } from 'lwc';

import {calcualteInterest} from 'c/girikonUtils';

export default class UseShareCode extends LightningElement {
    @track selectedYear;
    @track princepal;
    @track rate;
    @track interest=0;

    connectedCallback(){
        this.rate = 4;        
        this.princepal = 20000;
        this.selectedYear = 5;
    }

    get years(){
        return [{label:'5 Years',value:'5'},{label:'10 Years',value:'10'},{label:'15 Years',value:'15'},{label:'20 Years',value:'20'},
        {label:'25 Years',value:'25'},{label:'30 Years',value:'30'},{label:'50 years',value:'50'}];
    }

    changeYears(event){
        this.selectedYear = parseInt(event.target.value,10);        
        this.calculateInterest();
    }
    changePrincepal(event){
        this.princepal = event.target.value;
        this.calculateInterest();
    }
    changeRate(event){
        this.rate = event.target.value;
        this.calculateInterest();
    }

    calculateInterest(){
        this.interest = calcualteInterest(this.princepal,this.rate,this.selectedYear);
    }

    errorCallback(error,stack){
        
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-console
        console.log(stack);
    }
}