import {Component} from "@angular/core";
import {Page1} from '../page1/page1';
import {CreateDealPage} from '../create-deal/create-deal';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {EventDetailsPage} from '../event-details/event-details'; 
import {NavController,NavParams,MenuController} from 'ionic-angular';
import {DataService} from '../../service/dataService/dataService';
// import {SigninPage} from '../signin/signin';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Page1;
  tab2Root: any = DealsPage;  //deals Page
  tab3Allevent: any = AllEventsPage;
  tab4Root: any = AllCompaniesPage;
  // private menu: MenuController;
  //  static tabsActivted = new Array();
 
  //  mytabObj = {
  //    x: EventDetailsPage.tabbers
  //  }
  
  constructor(public nav:NavController){
    // selectTab(index: number) {
      // console.log('nav',this.nav);
  // ngAfterViewInit(){
  
  // }
      
      // DataService.getData();
      // console.log('event',EventDetailsPage.tabbers);
      // TabsPage.tabsActivted.push(this.mytabObj.x)
      // console.log('x',TabsPage.tabsActivted);
       
        // t.select(index);
    // } 
 }
 
//  ionViewWillLeave() {
//     console.log("Tabs Page Looks like I'm about to leave :(");
//     //  DataService.tabsData = false;
//           //  DataService.getData();

//     //  this.nav.pop();
//   }
//   ionViewWillEnter(){
//     console.log('Tabs page enter')
//     // DataService.tabsData = true;
//           // DataService.getData();

//   }
}
