import { LightningElement,track } from 'lwc';

import desc from '@salesforce/label/c.description';

export default class UseCustomLabel extends LightningElement {

    @track description = desc;
}