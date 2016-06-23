import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CreateListPeopleInvitePage} from '../create-list-people-invite/create-list-people-invite';

/*
  Generated class for the CreateEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-event/create-event.html',
})
export class CreateEventPage {
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController) {}
}
