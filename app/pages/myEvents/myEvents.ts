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
  private remaining : number;
  public wid;
  public person;
  public totalAttendents: number;
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
    
    //  ngZone.run(() => {
    //         this.width = window.innerWidth;
            
    //         this.height = window.innerHeight;
    //     });        
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
      if(this.width == 320){
       this.totalAttendents = 7 ;
     }
      
     else if(this.width == 360){
       this.totalAttendents = 7;
     }
    else if(this.width == 375){
       this.totalAttendents = 8;
     }
    else if(this.width == 411){
       this.totalAttendents = 8;
     }
    else if(this.width == 435){
       this.totalAttendents = 10;
     }
    else if(this.width == 480){
       this.totalAttendents = 10;
     }
    else if(this.width == 600){
       this.totalAttendents = 9;
     }
    else if(this.width == 640){
       this.totalAttendents = 14;
     }
    else if(this.width == 639){
       this.totalAttendents = 14;
     }
    else if(this.width == 720){
       this.totalAttendents = 13;
     }
     else if(this.width == 768){
       this.totalAttendents = 18;
     }
    else if(this.width == 800){
       this.totalAttendents = 17;
     }
    else if(this.width == 801){
       this.totalAttendents = 17;
     }
     else{
       this.totalAttendents = 6;
     }
      this.person = this.totalAttendents;
      if(this.myImg.length <= 6){
        this.remaining = 0;
      }
   else{
      this.remaining = this.myImg.length - this.person;
      console.log('length',this.remaining);
   }
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