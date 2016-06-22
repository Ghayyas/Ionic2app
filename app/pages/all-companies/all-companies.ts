import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SearchCompanyPage} from '../search-company/search-company';
import {CompanyDetailsPage} from '../company-details/company-details';
import {SubscribeCompanyPage} from '../subscribe-company/subscribe-company';

/*
  Generated class for the AllCompaniesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-companies/all-companies.html',
})
export class AllCompaniesPage {
   searchCompanyScreen = SearchCompanyPage;
   companyDetailsPage = CompanyDetailsPage
   subsCompanyPage = SubscribeCompanyPage
  constructor(public nav: NavController) {}
}
