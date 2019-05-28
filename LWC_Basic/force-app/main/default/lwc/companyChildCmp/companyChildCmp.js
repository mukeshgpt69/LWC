import { LightningElement,api } from 'lwc';

export default class CompanyChildCmp extends LightningElement {
    @api companyName;


    // This code won’t update companyName because:
    // 1) You can update public properties only at component construction time.
    // 2) Property values passed from owner components are read-only.
    updateCompanyName(){
        this.companyName = '"Girikon LLC" Updated from company child component';
    }
}