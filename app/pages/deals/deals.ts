import {Component,Pipe} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DealsDetailPage} from '../deals-detail/deals-detail';
import {searchDeals} from '../searchDeals/searchDeals';
import {SigninPage} from '../signin/signin';
import {limit} from '../limit';
import {MyApp} from '../../app';
import {CreateDealPage} from '../create-deal/create-deal';
/*
  Generated class for the DealsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/deals/deals.html',
  pipes: [limit]
})

export class DealsPage {
   search = searchDeals;
   createDeal = CreateDealPage;
   public location;
   enable:boolean;
   isenable:boolean;
  constructor(public nav: NavController) {
    this.location = 'New York, USA ';
  //  this.enable = MyApp.companyLogin;
   console.log('enable',this.enable);
   let getFromLocal = window.localStorage.getItem('type');
   if(getFromLocal == 1){
     this.isenable =true;
     console.log('isenable',this.isenable);
     
   }
   else{
     this.isenable =false;
     console.log('isenable',this.isenable);

   }

  }
   //=========Pipe Limit =======//
  //  transform(value: string, args: string[]) : string {
  //   let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
  //   let trail = args.length > 1 ? args[1] : '...';

  //   return value.length > limit ? value.substring(0, limit) + trail : value;
  // }
  //============ END ===========//

dealsDetailsPage(){
  console.log('Deals Page');
  this.nav.push(DealsDetailPage);    
}


// ionViewLoaded(){
//   this.nav.setRoot(SigninPage).then((data)=>{
//     console.log('data',data);
//   },(err)=>{
//     console.log('err',err)
//   })
// }


}
