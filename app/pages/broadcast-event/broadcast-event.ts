import {Component,OnInit} from '@angular/core';
import {NavController,Alert} from 'ionic-angular';
import {SubscriptionPage} from '../subscription/subscription';
import {AllEventsPage} from '../all-events/all-events';
import {Page1} from '../page1/page1';
import {SigninPage} from '../signin/signin';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the BroadcastEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var google:any;


@Component({
  templateUrl: 'build/pages/broadcast-event/broadcast-event.html',
})
export class BroadcastEventPage {
  subscription = SubscriptionPage;
  eventsPage = AllEventsPage;
  page1 = AllEventsPage;

  public region_arr = [];
  public region: string;
  public myLat:any;
  public myLong:any;
  
  constructor(public nav: NavController) {
  this.region = '';
}


 //============= google map location api =========//

   

     ngOnInit() {
      // this.myval = 'hello ghayyas'

        console.log('hello world from brodCast');
       
        var input = new google.maps.places.SearchBox(document.getElementById('region'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i]; i++){
            console.log('place', place.geometry.location);
             
              //  let lat = place.geometry.location.lat();
             this.myLat = place.geometry.location.lat();
              // let long = place.geometry.location.lng();
              this.myLong = place.geometry.location.lng();
             console.log('lat',this.myLat,'long', this.myLong);
            }
            // this.presentActionSheet();
            // this.submit();
       
        })
     }




    //============ google map location api  complete============//



  add(user){
    console.log('userRegion',user.value);
    let region_val = this.region;
    this.region_arr.push(region_val);
    console.log('regionarr',this.region_arr);
  
    this.region = '';
    user = "";
  }
  delete(i){
    this.region_arr.splice(i,1);
  }
 sendInvites(){
this.nav.push(TabsPage)
 }

}
