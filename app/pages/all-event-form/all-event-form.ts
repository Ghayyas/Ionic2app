import {Component} from '@angular/core';
import {NavController,ViewController} from 'ionic-angular';
import {AllEventsPage} from '../all-events/all-events';

/*
  Generated class for the AllEventFormPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-event-form/all-event-form.html',
})
export class AllEventFormPage {
  // createevent = AllEventsPage;
  constructor(public nav: NavController,public view:ViewController) {
    this.nav = nav;
  //  this.view.enableBack();
    console.log('nav',this.nav.id)
  }
  cancel(){
    this.nav.pop();
    // this.nav.push(AllEventsPage)
  }
  

}
