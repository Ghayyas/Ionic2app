import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AllEventsPage} from '../all-events/all-events';

/*
  Generated class for the AllEventFormPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/searchDeals/searchDeals.html',
})
export class searchDeals {
  createevent = AllEventsPage;
  constructor(public nav: NavController) {
    // this.nav = nav;
    // this.nav.canGoBack();
    console.log('nav',this.nav.id)
  }
  
  cancel(){
    // setTimeout(()=>{
    // this.nav.pop(true);
//  this.nav.remove().then(() => {
    this.nav.pop();
// });
      console.log('cancel');      
    // },300)

    // this.nav.push(AllEventsPage)
  }
  

}
