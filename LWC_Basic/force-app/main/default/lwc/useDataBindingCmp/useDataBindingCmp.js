import { LightningElement,track } from 'lwc';

export default class UseDataBindingCmp extends LightningElement {
    @track firstName='Mukesh';
    @track lastName='Gupta';

    handleChange(event){
        var fieldName = event.target.name;
        if(fieldName==='firstName'){
            this.firstName = event.target.value;
        }
        if(fieldName==='lastName'){
            this.lastName = event.target.value;
        }
    }

    get upperCaseName(){
        return `${this.firstName} ${this.lastName}`.toUpperCase();
    }
}