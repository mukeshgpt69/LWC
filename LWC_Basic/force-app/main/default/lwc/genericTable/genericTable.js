/* eslint-disable no-console */
import { LightningElement,track,api,wire } from 'lwc';

import getDatas from '@salesforce/apex/CommonDataTableController.getGenericObjectRecord'

export default class GenericTable extends LightningElement {
    @track wrap = {hasnext:false,pagesize:10,hasprev:false,offst:0,sortBy:'',LWCTabWrap:{tableColumn:{}}};
    @track sortByName;
    @track sortType='asc';    
    @track tableLoadingState = true;
    @track iconName='utility:table';
    @track error;
    
    @api objectName;
    @api fields;

    connectedCallback(){
        if(this.objectName.indexOf('_')<0){
            this.iconName = 'standard:'+this.objectName.toLowerCase();
        }

        const col = [];
        this.fields.split(',').forEach((item,index) => {
            if(index===0){
                this.sortByName = item;
            }
            col.push({label:item.replace('__c','').replace('_',' ').trim(),fieldName:item.trim()});
        });
        this.wrap.LWCTabWrap.tableColumn = col;
    }

    @wire (getDatas,{
        ObjectName:'$objectName',
        fieldstoget:'$fields',
        pagesize:this.wrap.pagesize,
        next:this.wrap.hasnext,
        prev:this.wrap.hasprev,
        off:this.wrap.offst,
        sortBy:'$sortByName',
        sortType:'$sortType'
    })    
    wireData({data,error}){
        if(data){
            this.wrap = data;
            console.log(this.wrap);
            this.error = undefined;
        }
        else if(error){
            this.wrap=undefined;
            this.error = error;
            console.error(error);
        }
        this.tableLoadingState = false;
    }
}