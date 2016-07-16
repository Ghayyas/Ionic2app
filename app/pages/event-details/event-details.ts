import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { DataService } from '../../service/dataService/dataService';
/*
  Generated class for the EventDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/event-details/event-details.html',
})
export class EventDetailsPage {
  // public x;
  
  constructor(public nav: NavController) {
    // this.nav.viewDidEnter.subscribe((view) => { 
      console.log("nav params",this.nav); 
    // });
  }
  // ionViewLoaded() {
  //   console.log("I'm alive!");
    
  //    EventDetailsPage.tabbers = true;
    
  // }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
     DataService.tabsData = false;
          //  DataService.getData();

    //  this.nav.pop();
  }
  ionViewWillEnter(){
    console.log('page enter')
    DataService.tabsData = true;
          // DataService.getData();

  }
}
