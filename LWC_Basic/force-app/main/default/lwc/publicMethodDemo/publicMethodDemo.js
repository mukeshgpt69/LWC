import { LightningElement,track } from 'lwc';
import videoURL from '@salesforce/resourceUrl/video';

export default class PublicMethodDemo extends LightningElement {
    @track myvideo = videoURL;

    handlePlayer(event){
        const isPlaying = this.template.querySelector('c-public-method').isPlaying();

        if(isPlaying){
            this.template.querySelector('c-public-method').pause();
            event.target.label = 'Play';
        }
        else{
            this.template.querySelector('c-public-method').play();
            event.target.label = 'Pause';
        }
    }
}