import { LightningElement,track } from 'lwc';

export default class UsePublicPropertyCmp extends LightningElement {
    @track myCompany;
    updateCompanyName(){
        const pc = this.template.querySelector('c-public-property-cmp')
        this.myCompany = pc.companyName;
    }
}