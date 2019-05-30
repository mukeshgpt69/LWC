import { track,LightningElement } from 'lwc';

export default class FireEventDemo extends LightningElement {
    @track pageNo=1;
    nextPage(){
        this.pageNo = this.pageNo + 1;
    }

    previousPage(){
        if(this.pageNo === 1){
            this.pageNo = 1;
        }
        else{
            this.pageNo = this.pageNo - 1;
        }
    }
}