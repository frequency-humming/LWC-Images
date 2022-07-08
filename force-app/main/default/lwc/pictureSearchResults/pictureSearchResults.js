import { LightningElement,api,wire } from 'lwc';
import newyork from '@salesforce/resourceUrl/newyork';
import incaruins from '@salesforce/resourceUrl/incaruins';
import dracula from '@salesforce/resourceUrl/dracula';
import spaceship from '@salesforce/resourceUrl/spaceship';
import nun from '@salesforce/resourceUrl/nun';
import reactor from '@salesforce/resourceUrl/reactor';
import owl from '@salesforce/resourceUrl/owl';
import getPictures from '@salesforce/apex/PictureDataService.getPictures';
import userData from '@salesforce/apex/PictureDataService.userData';

export default class PictureSearchResults extends LightningElement {

    pictureTypeId = '';
    pictures;
    urls = [];
    finalincaruins;
    finalnewyork;
    finaldracula;
    finalspaceship;
    finalnun;
    finalreactor;
    finalowl;
    error = undefined;

    @wire(getPictures, {pictureTypeId: '$pictureTypeId'})
    wiredPictures({data,error}){
        if(data){
            this.finalincaruins = [];
            this.finalnewyork = [];
            this.finaldracula = [];
            this.finalspaceship = [];
            this.finalnun = [];
            this.finalreactor = [];
            this.finalowl = [];
            this.pictures = data.map( type => {
                return {name:type.Name,number:type.number__c}
            })
            for(const key in this.pictures){
                console.log(this.pictures[key]);
                if(this.pictures[key].name == 'incaruins'){
                    this.iterate(this.pictures[key].number,incaruins);
                    this.finalincaruins = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }
                if(this.pictures[key].name == 'newyork'){
                    this.iterate(this.pictures[key].number,newyork);
                    this.finalnewyork = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }
                if(this.pictures[key].name == 'dracula'){
                    this.iterate(this.pictures[key].number,dracula);
                    this.finaldracula = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }
                if(this.pictures[key].name == 'spaceship'){
                    this.iterate(this.pictures[key].number,spaceship);
                    this.finalspaceship = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }    
                if(this.pictures[key].name == 'nun'){
                    this.iterate(this.pictures[key].number,nun);
                    this.finalnun = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }   
                if(this.pictures[key].name == 'reactor'){
                    this.iterate(this.pictures[key].number,reactor);
                    this.finalreactor = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }
                if(this.pictures[key].name == 'owl'){
                    this.iterate(this.pictures[key].number,owl);
                    this.finalowl = this.urls.map( ev => {
                        return {id:ev.id,url:ev.url}
                    })
                    this.urls = [];
                }
            }
            console.log(this.finalnewyork);
            console.log(this.finalincaruins);
            console.log(this.finaldracula);
            console.log(this.finalspaceship);
            console.log(this.finalreactor);
            console.log(this.finalowl);
            this.pictures = [];
        }
        if(error){
            this.error = 'Error in LWC';
            if (Array.isArray(error.body)) {
                this.error = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }
            this.pictures = undefined;
            console.log('Error '+this.error);
        }
    }

    iterate(num,resource){
        for(let i=1;i <= num;i++ ){
            let temp = resource +'/'+i+'.png';
            let id = i;
            let url = {id:id,url:temp};
            this.urls.push(url);
            }
    }

    @api
    searchPictures(pictureTypeId){
        this.pictureTypeId = pictureTypeId;
    }

    connectedCallback() {
        //Here we explicitly call our Apex method(Imperative call)
        console.log('in the callback');
        userData({pictureTypeId:'All Types'})
            .then((result) => {
                if(result){
                    console.log(result);
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }

}