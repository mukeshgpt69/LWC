import { LightningElement,track,api,wire } from 'lwc';

import getDatas from '@salesforce/apex/ContactController.getData'

export default class GenericTable extends LightningElement {
    @track dataList;
    @track error;
    @api objectName;
    @api fields;

    @wire (getDatas,{fields:'$fields',objectName:'$objectName'})
    
    wireData({error,data}){
        if(data){
            this.dataList = data;
            this.error = undefined;
        }
        else if(error){
            this.dataList=undefined;
            this.error = error;
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }
}