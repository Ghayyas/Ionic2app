import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EventDetailsPage} from '../event-details/event-details';
import {AllEventFormPage} from '../all-event-form/all-event-form';
import {Http, Headers } from '@angular/http';


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
  event: [Object];
  arr:[Object];
  // ev:string
  alleventformscreen = AllEventFormPage;
  constructor(public nav: NavController, public http:Http) {
    this.http = http;

    let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.get('http://nameless-scrubland-35696.herokuapp.com/api/events/get',{headers:headers})
    .subscribe(
      (data)=>{
  // this.arr = [{"name":"value"},{"name":"hers"},{"name":"abcd"}]
      
          // let s = data;
        this.event = data.json().events;
        console.log('data',this.event);
      

      },
      (err)=>{
        console.log('err',err);
        let str = JSON.parse(err._body);
      // str = str.replace(/\\/g, '')
      if(str.status_code == 422){
        console.log('Please Fill all Required Fields');
      }
      console.log('status code',str.status_code)
      console.log('error reciveing', str.message);
      }
    )
  }
  // getRandom(){

  

    // console.log('params',this.parameters);
    
}
