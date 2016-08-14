import {Component,OnInit} from '@angular/core';
import {NavController,MenuController,AlertController,LoadingController,ToastController} from 'ionic-angular';
import {SubscriptionPage} from '../subscription/subscription';
import {AllEventsPage} from '../all-events/all-events';
import {Page1} from '../page1/page1';
import {SigninPage} from '../signin/signin';
import {CreateEventPage} from '../create-event/create-event';

import {TabsPage} from '../tabs/tabs';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
/*
  Generated class for the BroadcastEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google:any;


@Component({
  templateUrl: 'build/pages/broadcast-event/broadcast-event.html'
})
export class BroadcastPage {
  subscription = SubscriptionPage;
  eventsPage = AllEventsPage;
  page1 = AllEventsPage;

  public region_arr = [];
  public region: string;
  public region_value_arr = [];
  static myLat:any;
  static myLong:any;
  static gettingPlaces: any;
  
  
  constructor(public nav: NavController,private http:Http, private loading:LoadingController,private alert:AlertController,private toast: ToastController,
  private menu:MenuController) {
   console.log('nav works')
  this.region = '';
  console.log('from broadcast event',CreateEventPage.arraytoSend[0]);
  

}


 //============= google map location api =========//

  

     ngOnInit() {
 
     
          var input = new google.maps.places.SearchBox(document.getElementById('region'));
      //  document.getElementById('region').addEventListener('keydown',this.keydownEvent,false);
      // try{
        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            console.log('getting values',places);
            BroadcastPage.gettingPlaces = input.getPlaces()[0].formatted_address;
            var bounds = new google.maps.LatLngBounds();
            var i, place;
          try {
            for( i = 0; place=places[i]; i++){
          
            //  if(place.geometry.location == undefined){
            //   window.alert('You cant get your Location');
            // }
            
            //  console.log('place', place.geometry.location);
           
            //  console.log('latitude',place.geometry.location.lat())
             BroadcastPage.myLat = place.geometry.location.lat();
              // let long = place.geometry.location.lng();
              BroadcastPage.myLong = place.geometry.location.lng();
              // console.log('longitude',place.geometry.location.lng())
            //  console.log('lat',this.myLat,'long', this.myLong);
            }
          }
    catch(err) {
          //  console.log('getting error from catch',err);
          this.showToast('Can not get your location !');
   }
     
        })
    //  }
    //  catch(err){
    //    console.log('getting errror from catching',err);
       
    //    this.showToast('Internet Disconnected !');
    //  }
    }




    //============ google map location api  complete============//



  add(region){
    console.log('userRegion',region.value);
    console.log('lat long',BroadcastPage.myLat,BroadcastPage.myLong);
    let region_val = BroadcastPage.gettingPlaces;
    let region_lat = BroadcastPage.myLat;
    let region_long = BroadcastPage.myLong;
    this.region_arr.push(region_val);
    this.region_value_arr.push({'lat': BroadcastPage.myLat, 'long': BroadcastPage.myLong})
    console.log('regionarr',this.region_arr);
    console.log('latitude Array',this.region_value_arr);
    // BroadcastPage.myLat = '';
    // BroadcastPage.myLong = '';
    this.region = '';
    region = "";
  }
  delete(i){
    this.region_arr.splice(i,1);
    this.region_value_arr.splice(i,1);
  }
  
   ionViewWillLeave(){
     console.log('leaving');
     BroadcastPage.gettingPlaces = "";
     BroadcastPage.myLat = '';
     BroadcastPage.myLong = '';
     CreateEventPage.arraytoSend = [];
     CreateEventPage.myImage  = '';
   }

    showToast(message: string) {
    let toast = this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
         }
  
  
 sendBroadCast(){
  //  console.log("BroadCast Event Works");
   
   let jsonS = JSON.stringify(this.region_value_arr);
   console.log('log',jsonS);
  //  for (let i = 0 ; i < jsonS.length ; i++){
  CreateEventPage.arraytoSend[0]['origins'] = jsonS;
  CreateEventPage.arraytoSend[0]['emails'] = null; //push('email',jsonS);
  console.log('getting array',CreateEventPage.arraytoSend[0]);
//  }
let loading = this.loading.create({
           content: "Please wait...",
          //  duration: 3000,
           dismissOnPageChange: true
           
        });
  loading.present();
  var headers = new Headers();
  var data  = CreateEventPage.arraytoSend[0];
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'event/create',data,{headers:headers})
    .subscribe(
      (data) => {
        setTimeout(function() {
          loading.dismiss(true);
        }, 3000);
        
      // CreateEventPage.arraytoSend[0]  = '';
      CreateEventPage.arraytoSend = [];
        this.showToast('Success !');
        console.log('data send',data.json());
        // this.nav.popTo(TabsPage);
          this.nav.pop().then((s)=>{
             this.nav.pop();
           });        // this.nav.setRoot(TabsPage);
        
        // this.nav.setRoot(TabsPage).then((suc)=>{
          //  this.nav.push(Page1);
         // });
        //  this.nav.setRoot(TabsPage).then((suc)=>{
        //   this.nav.push(Page1)
        // });

         },(err)=>{
      setTimeout(function() {
          loading.dismiss(true);
        }, 3000);
       CreateEventPage.arraytoSend = [];
       CreateEventPage.myImage = ''
        // this.nav.push(TabsPage)
         console.log('err',err);
         let error = err.json();
         console.log('getting error',error);
          this.showToast('Data not Send to server !');
          let str = JSON.parse(err._body);
          if(str.status_code == 422){
          this.showToast('Fileds Missing !');
          }
          if(error.status_code== 401){
                let toast = this.toast.create({
                message: "Session Expired",
                duration: 3000,
                position: 'bottom'
           });
              toast.present()
               window.localStorage.clear();
               this.menu.enable(false);
               this.nav.setRoot(SigninPage);
        }
      })

// this.nav.push(TabsPage)
//  }

}

   

}