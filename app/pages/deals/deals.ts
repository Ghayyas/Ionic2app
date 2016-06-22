import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DealsDetailPage} from '../deals-detail/deals-detail';

/*
  Generated class for the DealsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/deals/deals.html',
})
export class DealsPage {
   dealsDetailsPage = DealsDetailPage;
  constructor(public nav: NavController) {}
}
