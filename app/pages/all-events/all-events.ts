import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EventDetailsPage} from '../event-details/event-details';
import {AllEventFormPage} from '../all-event-form/all-event-form';

/*
  Generated class for the AllEventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-events/all-events.html',
})
export class AllEventsPage {
  eventDetailPage = EventDetailsPage;
  alleventformscreen = AllEventFormPage;
  constructor(public nav: NavController) {}
}
