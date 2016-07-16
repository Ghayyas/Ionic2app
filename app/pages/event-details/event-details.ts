import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { DataService } from '../../service/dataService/dataService';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {eventSelect} from '../event-select/event-select';







/*
  Generated class for the EventDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/event-details/event-details.html',
})
export class EventDetailsPage {
 
   tab1Root: any = Page3;
  tab2Root: any = DealsPage;  //deals Page
  tab3Allevent: any = AllEventsPage;
  // tab4Root: any = AllCompa.niesPage;
  constructor(public nav: NavController) {
    // this.nav.viewDidEnter.subscribe((view) => { 
    
      
    // });
  }
   
  

  
  
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
