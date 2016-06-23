import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CreateEventPage} from '../create-event/create-event';

/*
  Generated class for the AllEventFormPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-event-form/all-event-form.html',
})
export class AllEventFormPage {
  createevent = CreateEventPage;
  constructor(public nav: NavController) {}
}
