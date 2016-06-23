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
  constructor(public nav: NavController) {}
}
