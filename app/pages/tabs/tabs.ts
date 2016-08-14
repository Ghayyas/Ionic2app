import {Component,ViewChild} from "@angular/core";
import {Page1} from '../page1/page1';
import {CreateDealPage} from '../create-deal/create-deal';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {EventDetailsPage} from '../event-details/event-details'; 
import {NavController,NavParams,MenuController,Tabs} from 'ionic-angular';
import {DataService} from '../../service/dataService/dataService';
// import {SigninPage} from '../signin/signin';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  private param;
  // this tells the tabs component which Pages
  // should be each tab's root Page

@ViewChild('myTabs') myTabs: Tabs;

ionViewDidEnter() {
  // window.alert('view enter');
  var t: Tabs = this.nav.parent;
   t.select(this.param);
  //  this.nav.getActive();
  // console.log('privous tab',this.myTabs);
  // this.nav.parent.select(tabIndex); 
}
 select(param){
   console.log('param select',param);
   this.param = param;
  //  var t: Tabs = this.nav.parent;
  //  t.select(0);
 }
//  selected(param){
//    console.log('params selected',param);
//    var t: Tabs = this.nav.parent;
//    t.select(param);
//  }
    tab1Root: any = Page1;
    tab2Root: any = DealsPage; //deals Page
    tab3Allevent: any = AllEventsPage;
    tab4Root: any = AllCompaniesPage; 

  constructor(public nav:NavController){
  // this.tab1Root = Page1;
  // this.tab2Root = DealsPage;
  // this.tab3Allevent = AllEventsPage;
  // this.tab4Root = AllCompaniesPage
  
 }
//  ionViewWillEnter() {
//    let tab = document.getElementById('mytab');
//    var att = document.createAttribute("tabbarplacement");
//     att.value = "bottom";
//     tab.setAttributeNode(att);
//     console.log('tabs done');
//  }


}
