import { LightningElement } from 'lwc';

export default class Picture extends LightningElement {


    searchPictures(event){
        const pictureTypeId = event.detail.pictureTypeId;
        console.log('in picture component '+pictureTypeId);
        this.template.querySelector('c-picture-search-results').searchPictures(pictureTypeId);
    }
}