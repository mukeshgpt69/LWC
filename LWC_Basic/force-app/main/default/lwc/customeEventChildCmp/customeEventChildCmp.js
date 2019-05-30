import { LightningElement } from 'lwc';

export default class CustomeEventChildCmp extends LightningElement {
    
    handleNext(){
        this.dispatchEvent(new CustomEvent('nextclick'));
    }
    handlePrevious(){
        this.dispatchEvent(new CustomEvent('previousclick'))
    }
}