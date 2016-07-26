import {Component} from '@angular/core';
import {NavController,NavParams,Loading,Alert,MenuController} from 'ionic-angular';
// import { DataService } from '../../service/dataService/dataService';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {Page1} from '../page1/page1';
import {CreateDealPage} from '../create-deal/create-deal';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {CreateEventPage}from '../create-event/create-event';
import {TabsPage} from '../tabs/tabs';


@Component({
  templateUrl: 'build/pages/myEvents/myEvents.html',
})
export class myEvents{
  tab1: any = Page1;
  tab2: any = DealsPage;  //deals Page
  tab3: any = AllEventsPage;
  tab4: any = AllCompaniesPage;
    constructor(public menu: MenuController,public nav: NavController){
     
    }

    toogle(){
      console.log('toogle clicked');
      this.menu.toggle()
    }
    createEvent(){
      
         this.nav.push(CreateEventPage);
   
       
    }
}