import { LightningElement,track } from 'lwc';

export default class SetPropertiesOnChildCmp extends LightningElement {
    @track companyName='Girikon';

    updateCompanyName(){
        this.companyName = '"Girikon Solutions Pvt. Ltd." updated from parent component';
    }
}