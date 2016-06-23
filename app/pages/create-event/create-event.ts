import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CreateListPeopleInvitePage} from '../create-list-people-invite/create-list-people-invite';
import {Http, Headers } from '@angular/http';
/*
  Generated class for the CreateEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-event/create-event.html',
})

export class CreateEventPage {
    http: any;
    parameters: {
     name: string,
     location: string,
     start_date: string,
     end_date: string,
     type: boolean,
     description : string,
     photo:string
}
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, http: Http) {
    this.http = http;
}

  submit(parameters){
    console.log('params',parameters)
  //   var headers = new Headers();
  //   var data  = "event-name" + parameters.name + "event-location"+ parameters.location + "event-start-date" + parameters.start_date + "event-end-date" + parameters.end_date + "event-image" + parameters.photo + "event-details" + parameters.description;
  //  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/events/create',data,{headers:headers})
  //   .subscribe(data => {
  //     console.log('reciveing data',data);
  //   })

}
}
