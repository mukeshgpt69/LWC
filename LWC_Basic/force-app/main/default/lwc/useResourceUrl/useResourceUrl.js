import { LightningElement,track } from 'lwc';
import GIRIKON_LOG from '@salesforce/resourceUrl/girikonLogo';
import TRAILHEAD_CHARACTERS from '@salesforce/resourceUrl/trailhead_characters';

export default class UseResourceUrl extends LightningElement {

    @track logo = GIRIKON_LOG;

    // Expose URL of assets included inside an archive file
    einsteinUrl = TRAILHEAD_CHARACTERS + '/images/einstein.png';

}