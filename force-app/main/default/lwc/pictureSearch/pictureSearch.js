import { LightningElement } from 'lwc';

export default class PictureSearch extends LightningElement {

    searchOptions = [{label:'All Types', value: ''},
                    {label:'Space', value: 'Space'},
                    {label:'New York',value:'New York'},
                    {label:'Inca',value:'Inca'},
                    {label:'Ruins',value:'Ruins'},
                    {label:'Nun',value:'Nun'},
                    {label:'Cyberpunk',value:'Cyberpunk'},
                    {label:'Dracula',value:'Dracula'}];

    pictureType = '';


    handleChange(event) {
        this.value = event.detail.value;
    }

    handleChange(event) {
        event.preventDefault();
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        this.pictureType = event.target.value;
        console.log('target value '+this.pictureType);
        let searchEvent = new CustomEvent('search', { detail: {pictureTypeId: this.pictureType} });
        this.dispatchEvent(searchEvent);
    }


}