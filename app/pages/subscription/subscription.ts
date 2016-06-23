import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AllCompaniesPage} from '../all-companies/all-companies';

/*
  Generated class for the SubscriptionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/subscription/subscription.html',
})
export class SubscriptionPage {
    allcompanies = AllCompaniesPage;
  constructor(public nav: NavController) {}
}
