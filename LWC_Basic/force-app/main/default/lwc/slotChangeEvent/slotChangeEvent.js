import { LightningElement } from 'lwc';

export default class SlotChangeEvent extends LightningElement {
    handleSlotchange(event){
        
        // eslint-disable-next-line no-console
        console.log(event.target.name+' slot change!');
    }
}