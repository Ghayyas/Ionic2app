import {Component,OnInit} from '@angular/core';
import {NavController,Alert,Loading} from 'ionic-angular';
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
  public myLat:any;
  public myLong:any;
  
  constructor(public nav: NavController,private http:Http) {
    console.log('nav works')
  this.region = '';
  console.log('from broadcast event',CreateEventPage.arraytoSend[0]);
  

}


 //============= google map location api =========//

   

     ngOnInit() {
 
       
        var input = new google.maps.places.SearchBox(document.getElementById('region'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i]; i++){
             if(place.geometry.location == undefined){
              window.alert('You cant get your Location');
            }
            
             console.log('place', place.geometry.location);
           
             
             this.myLat = place.geometry.location.lat();
              // let long = place.geometry.location.lng();
              this.myLong = place.geometry.location.lng();
             console.log('lat',this.myLat,'long', this.myLong);
            }
     
        })
     }




    //============ google map location api  complete============//



  add(region){
    console.log('userRegion',region.value);
    let region_val = this.region;
    this.region_arr.push(region_val);
    console.log('regionarr',this.region_arr);
  
    this.region = '';
    region = "";
  }
  delete(i){
    this.region_arr.splice(i,1);
  }
 sendInvites(){
   console.log("send Invites Works");
   
   let jsonS = JSON.stringify(this.region_arr);
   console.log('log',jsonS);
  //  for (let i = 0 ; i < jsonS.length ; i++){
  CreateEventPage.arraytoSend[0]['origins'] = jsonS;
  CreateEventPage.arraytoSend[0]['emails'] = null; //push('email',jsonS);
  console.log('getting array',CreateEventPage.arraytoSend[0]);
//  }
let loading = Loading.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
           
        });
  this.nav.present(loading);
  var headers = new Headers();
  var data  = CreateEventPage.arraytoSend[0];
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'event/create',data,{headers:headers})
    .subscribe(
      (data) => {
         loading.dismiss(true);

       console.log('data send',data.json()); 

      //  console.log('parameters',params);
      },(err)=>{
        loading.dismiss(true);
         console.log('err',err);
         let error = err.json();
         console.log('getting error',error);
      })

// this.nav.push(TabsPage)
//  }

}
}