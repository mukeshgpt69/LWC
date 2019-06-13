import { LightningElement,track,api,wire } from 'lwc';

import getDatas from '@salesforce/apex/ContactController.getData'

export default class GenericTable extends LightningElement {
    @track dataList;
    @track tableLoadingState = true;
    @track error;
    @track columns; 
    @api objectName;
    @api fields;

    connectedCallback(){        
        const col = [];
        this.fields.split(',').forEach(item => {
            col.push({label:item.replace('__c','').replace('_',' ').trim(),fieldName:item.trim()});
        });
        this.columns = col;
    }

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
        this.tableLoadingState = false;
    }
}