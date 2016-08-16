/**
 * 
 * Tabs Pages
 * 
 */



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
  mySelectedIndex: number;


 private tab1Root: any;
 private tab2Root: any; //deals Page
 private tab3Allevent: any;
 private tab4Root: any; 

  constructor(public nav:NavController, private navParams: NavParams){
  this.tab1Root = Page1;
  this.tab2Root = DealsPage;
  this.tab3Allevent = AllEventsPage;
  this.tab4Root = AllCompaniesPage;

   this.mySelectedIndex = navParams.data.tabIndex || 0;

   console.log('my Index', this.mySelectedIndex);
   }



}
