import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DealsDetailPage} from '../deals-detail/deals-detail';
import {searchDeals} from '../searchDeals/searchDeals';
import {SigninPage} from '../signin/signin';
/*
  Generated class for the DealsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/deals/deals.html',
})
export class DealsPage {
   search = searchDeals;
  constructor(public nav: NavController) {}
dealsDetailsPage(){
  console.log('Deals Page');
  this.nav.rootNav.push(DealsDetailPage)    
}


// ionViewLoaded(){
//   this.nav.setRoot(SigninPage).then((data)=>{
//     console.log('data',data);
//   },(err)=>{
//     console.log('err',err)
//   })
// }


}
