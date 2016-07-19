import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SubscriptionPage} from '../subscription/subscription';

/*
  Generated class for the BroadcastEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/broadcast-event/broadcast-event.html',
})
export class BroadcastEventPage {
  subscription = SubscriptionPage;
  public region_arr = [];
  public region: string;
  
  constructor(public nav: NavController) {
 
}
  add(user){
    console.log('userRegion',user.value);
    let region_val = this.region;
    this.region_arr.push(region_val);
    console.log('regionarr',this.region_arr);
    this.region = '';
    user = "";
  }
}
