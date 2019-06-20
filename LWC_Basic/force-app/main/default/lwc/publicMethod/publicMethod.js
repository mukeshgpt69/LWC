import { LightningElement,api } from 'lwc';

export default class PublicMethod extends LightningElement {
    @api videoUrl;
    @api videoType;
    
    @api 
    isPlaying(){
        const player = this.template.querySelector('video');
        return player !== null && player.paused === false;
    }

    @api
    play(){
        const player = this.template.querySelector('video');
        if(player){
            player.play();
        }
    }

    @api
    pause(){
        const player = this.template.querySelector('video');
        if(player){
            player.pause();
        }
    }
}