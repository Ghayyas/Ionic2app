import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BroadcastEventPage} from '../broadcast-event/broadcast-event';

/*
  Generated class for the CreateListPeopleInvitePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-list-people-invite/create-list-people-invite.html',
})
export class CreateListPeopleInvitePage {
  broadcastEvent = BroadcastEventPage;
  constructor(public nav: NavController) {}
}
