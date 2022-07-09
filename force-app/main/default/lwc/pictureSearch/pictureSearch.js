import { LightningElement } from 'lwc';

export default class PictureSearch extends LightningElement {

    searchOptions = [{label:'All Types', value: ''},
                    {label:'Cyberpunk',value:'Cyberpunk'},
                    {label:'Dracula',value:'Dracula'},
                    {label:'Inca',value:'Inca'},
                    {label:'New York',value:'New York'},
                    {label:'Nun',value:'Nun'},
                    {label:'Owl',value:'Owl'},
                    {label:'Reactor',value:'Reactor'},
                    {label:'Ruins',value:'Ruins'},
                    {label:'Space', value: 'Space'}];

    pictureType = '';

    handleChange(event) {
        event.preventDefault();
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        this.pictureType = event.target.value;
        let searchEvent = new CustomEvent('search', { detail: {pictureTypeId: this.pictureType} });
        this.dispatchEvent(searchEvent);
    }


}