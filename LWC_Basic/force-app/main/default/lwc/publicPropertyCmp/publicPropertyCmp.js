import { LightningElement,api } from 'lwc';

export default class PublicPropertyCmp extends LightningElement {
    // you can initialize companyName public property(will be access from another component)
    @api 
    companyName='Girikon';

}