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
  
  // public pet: string;
  static nav: NavController;
  public event = [];
  private segment:any;
  //  public tab:TabsPage
  constructor(private menu:MenuController,public nav: NavController) {
  // this.pet = 'public';
  this.segment = 'private';

  this.event = [{type: 0,img: './img/event1.jpg',name: 'Fun party'},{type: 0, img: './img/event3.jpg',name:'wedding Event'},{type: 0 , img: 'img/event1.jpg',name: 'Fun party'},{type: 0 , img: './img/event2.jpg',name: 'launch Event'},{type: 0, img: './img/event4.jpg',name: 'Birthday Party'}
   ,{type: 1, img: './img/deal1.jpg',name: ' More than 110%...'}, {type: 1, img: './img/deal2.jpg', name: "More than 110%.."}, {type: 1, img: './img/deal1.jpg',name: 'More than 110%'},{type: 1, img: './img/deal2.jpg', name: 'More than 110%'},{type: 1, img: './img/deal1.jpg', name: 'More than 110%'}]

  let token =  window.localStorage.getItem('ecnob.token');
  if(token){
    this.menu.enable(true);
  }
  else{
    this.nav.setRoot(SigninPage).then((suc)=>{
      console.log("Root Nav Successs");
      this.nav.push(SigninPage);

    })
  }
 
  // if(AuthService.isLoggedin == false){
  //   this.nav.rootNav.push(SigninPage)
  // }
   
  }

  ionViewWillEnter(){

     
     
  //  var tab = document.getElementsByTagName("ion-tabs")[0];
  //  var att = document.createAttribute("tabbarplacement");
  //   att.value = "bottom";
  //   tab.setAttributeNode(att);
  //   console.log('page1 done');
  }

  ionViewWillLeave(){
    // this.nav.viewWillEnter
    this.menu.close();
  }

  
  // myclick(param){
  //    this.pet = param;
  //    console.log('params',this.pet);
  //  }
  
}
