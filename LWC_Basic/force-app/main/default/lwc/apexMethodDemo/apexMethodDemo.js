import { wire,track,LightningElement } from 'lwc';

import getContactList from '@salesforce/apex/ContactController.getContact';

export default class ApexMethodDemo extends LightningElement {
    @track contacts;
    @track error;

    @wire(getContactList)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}