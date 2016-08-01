import {Component,OnInit} from "@angular/core";
import {MenuController, NavController,Tabs} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {myEvents} from '../myEvents/myEvents';
import {AuthService} from '../signin/authservice';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  
  public pet: string;
  static nav: NavController;
  //  public tab:TabsPage
  constructor(private menu:MenuController,public nav: NavController) {
  this.pet = 'public';


  let token =  window.localStorage.getItem('ecnob.token');
  if(token){
    this.menu.enable(true);
  }
  else{
    this.nav.setRoot(SigninPage).then((suc)=>{
      console.log("Root Nav Successs");
      this.nav.rootNav.push(SigninPage);

    })
  }
 
  // if(AuthService.isLoggedin == false){
  //   this.nav.rootNav.push(SigninPage)
  // }
   
  }
  // ionViewWillEnter(){
  //  var tab = document.getElementsByTagName("ion-tabs")[0];
  //  var att = document.createAttribute("tabbarplacement");
  //   att.value = "bottom";
  //   tab.setAttributeNode(att);
  //   console.log('page1 done');
  // }

  ionViewWillLeave(){
    // this.nav.viewWillEnter
    this.menu.close();
  }

  
  myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
  
}
