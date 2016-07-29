import {Component,OnInit} from "@angular/core";
import {MenuController, NavController} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {myEvents} from '../myEvents/myEvents';


@Component({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  
  public pet: string;
  static nav: NavController;
  
  constructor(private menu:MenuController,public nav: NavController) {
  this.pet = 'public';

   var tab = document.getElementsByTagName("ion-tabs")[0];
   var att = document.createAttribute("tabbarplacement");
    att.value = "bottom";
    tab.setAttributeNode(att);
  let token =  window.localStorage.getItem('ecnob.token');
  if(token){
      this.menu.enable(true);
  }
 
  // if(SigninPage.isLoggedin == false){
  //   this.nav.push(SigninPage)
  // }
   
  }
  ionViewWillLeave(){
    this.menu.close();
  }

  
  myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
  
}
