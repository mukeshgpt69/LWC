import { LightningElement,track,wire } from 'lwc';
import findContact from '@salesforce/apex/ContactController.findContactsByName';
const DELAY = 300;
export default class ApexMethodDemo2 extends LightningElement {
    @track searchKey ='';
    @track conatctList;
    @track error;

    @wire(findContact,{keyword:'$searchKey'})
    wireContactList({error,data}){
        if(data){
            this.conatctList = data;
            this.error = undefined;
        }
        else if(error){
            this.conatctList = undefined;
            this.error = error;
        }
    }

    findContacts(event){
        window.clearTimeout(this.delayTimeout);
        const keyword = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = keyword;
        },DELAY);
    }
}