import {Component} from "@angular/core";
import {MenuController, NavController} from 'ionic-angular';
import {SigninPage} from '../signin/signin';


@Component({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  
  public pet: string;
  
  constructor(public menu:MenuController,public nav: NavController) {
  this.pet = 'public';
  // if(SigninPage.isLoggedin == false){
  //   this.nav.push(SigninPage)
  // }
   menu.enable(true);
  }
  
  myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
  
}
