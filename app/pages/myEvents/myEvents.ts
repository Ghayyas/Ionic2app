import {Component,NgZone} from '@angular/core';
import {NavController,NavParams,Loading,Alert,MenuController} from 'ionic-angular';
// import { DataService } from '../../service/dataService/dataService';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {Page1} from '../page1/page1';
import {CreateDealPage} from '../create-deal/create-deal';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {CreateEventPage}from '../create-event/create-event';
import {TabsPage} from '../tabs/tabs';
import {limit} from '../limit';
import {ChangeDetectorRef} from '@angular/core'


@Component({
  templateUrl: 'build/pages/myEvents/myEvents.html',
  pipes: [limit]
})
export class myEvents{
  tab1: any = Page1;
  tab2: any = DealsPage;  //deals Page
  tab3: any = AllEventsPage;
  tab4: any = AllCompaniesPage;
  myImg: [Object];
  innerWidth: number;
  public width;
  public height;
  private remaining;
  public wid;
  public totalAttendents;
    constructor(public menu: MenuController,public nav: NavController,ngZone:NgZone){
     this.myImg = [
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'},
       {img: './img/event1.jpg'}   
    ];
    // this.width = parseInt(this.wid);
    // window.onresize = (e) =>
    // {
        ngZone.run(() => {
            this.width = window.innerWidth;
            
            this.height = window.innerHeight;
        });
        console.log('width',this.width,'Height',this.height);
    // };

    //  this.getTotal();


    }
    
    ionViewWillEnter(){
     if(this.width > 360){
       this.totalAttendents = 7;
     }
      if(this.width > 411){
       this.totalAttendents = 8;
     }
     if(this.width > 435){
       this.totalAttendents = 10;
     }
      if(this.width > 320){
       this.totalAttendents = 9;
     }
       if(this.width > 375){
       this.totalAttendents = 9;
     }
      if(this.width > 768){
       this.totalAttendents = 18;
     }
      this.remaining = this.myImg.length - parseInt(this.totalAttendents);
      console.log('length',this.remaining);
        // let total = 0;
        // for(var i =0; i < this.myImg.length; i++){
        //  var product = this.myImg[i];
        //  console.log('total Images',product);
        // // total += product * product;
        // }
        // return total;
    }

    toogle(){
      console.log('toogle clicked');
      this.menu.toggle()
    }
    createEvent(){
      
         this.nav.push(CreateEventPage);
   
       
    }
}