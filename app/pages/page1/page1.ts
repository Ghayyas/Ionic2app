/**
 * 
 * Home Screen after Login in.
 * 
 */


import {Component,OnInit} from "@angular/core";
import {MenuController, NavController,Tabs, ToastController} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {myEvents} from '../myEvents/myEvents';
import {AuthService} from '../signin/authservice';
import {TabsPage} from '../tabs/tabs';
import {Http, Headers} from "@angular/http";
import {SERVER_NAME} from '../../service/dataService/dataService';

/**
 * 
 * Component 
 * 
 */
@Component({
  templateUrl: 'build/pages/page1/page1.html',
})

/**
 * 
 * class page 1
 * 
 */



export class Page1 {
  
  public pet: string;
  static nav: NavController;
  public event = [];
  private segment:any;
  //  public tab:TabsPage
  constructor(private menu:MenuController,public nav: NavController, private http:Http, private toast: ToastController) {
  this.pet = 'deals';
  // this.segment = 'private';

  // this.event = [{type: 0,img: './img/event1.jpg',name: 'Fun party'},{type: 0, img: './img/event3.jpg',name:'wedding Event'},{type: 0 , img: 'img/event1.jpg',name: 'Fun party'},{type: 0 , img: './img/event2.jpg',name: 'launch Event'},{type: 0, img: './img/event4.jpg',name: 'Birthday Party'}
  //  ,{type: 1, img: './img/deal1.jpg',name: ' More than 110%...'}, {type: 1, img: './img/deal2.jpg', name: "More than 110%.."}, {type: 1, img: './img/deal1.jpg',name: 'More than 110%'},{type: 1, img: './img/deal2.jpg', name: 'More than 110%'},{type: 1, img: './img/deal1.jpg', name: 'More than 110%'}]

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

  ionViewWilEnter(){
  }
  ionViewWillEnter(){
        

  }

  ionViewWillLeave(){
    this.menu.close();
  }

  //====================== Getting Segment click ===============//
  segmentClick(param){
     this.pet = param;
     if(param == 'events'){
let toast = this.toast.create({
      message: "Fetching New Results Please wait...",
      // duration: 5000,
      position: 'bottom'
       });
       toast.present();
  let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.get( SERVER_NAME +'event/featured',{headers:headers})
    .subscribe(
      (data)=>{
        // console.log('data',data);
        setTimeout(function() {
          toast.dismiss();
        }, 3000);
      //  load.dismiss();
      console.log('Data',data);

       this.event = data.json();
       console.log('events',this.event);
       
    //     if(this.event == undefined){
    // let toast = this.toast.create({
    //   message: "Sorry no new Events Avalible",
    //   duration: 3000,
    //   position: 'bottom'
    //    });
    //    toast.present();

    //    let alert = this.alertCtrl.create({
    //       title: 'Sorry',
    //       subTitle: 'No New Events Avalible!',
    //       buttons: ['OK']
    //  });
    //    alert.present();
      //  load.dismiss(true);
        //  this.definedError = true;         //IF DATA FROM SERVER IS UNDEFINED

        // }
    //     else if(this.event.length == 0){
    //  let toast = this.toast.create({
    //   message: "Sorry no new Events Avalible",
    //   duration: 3000,
    //   position: 'bottom'
    //    });
    //    toast.present();
    //     let alert = this.alertCtrl.create({
    //       title: 'Sorry',
    //       subTitle: 'No New Events Avalible!',
    //       buttons: ['OK']
    //  });
    //    alert.present();
      //  load.dismiss(true);
          // this.definedError = true;
        // }

      // load.dismiss(true);
     

      },
      (err)=>{
    // console.log('err',err);
     setTimeout(function() {
          toast.dismiss();
        }, 3000);
        if(err){
          console.log('getting error',err);
    //  let toast = this.toast.create({
    //   message: "Needs Internet Connection",
    //   duration: 3000,
    //   position: 'bottom'
    //    });
    //    toast.present();
       }
    // load.dismiss(true);
    //     let alert = this.alertCtrl.create({
    //       title: 'Error !',
    //       subTitle: 'Make Sure you are connected to internet',
    //       buttons: ['OK']
    //  });
    //   alert.present();
      // load.dismiss(true);
        // if (err){
         
        //   // this.error = true;
      
        // }
        console.log('err',err);
        let str = JSON.parse(err._body);
       
  
             
     if(str.status_code == 500){
        
      let toast = this.toast.create({
      message: "Internal Server error",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
  
      }
      // let expire = 401
      // str.status_code
      if(str.status_code == 401){
                let toast = this.toast.create({
                message: "Session Expired",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
               window.localStorage.clear();
               this.menu.close();
               this.menu.enable(false);
               this.nav.setRoot(SigninPage);
        }
      }
    )  
     }
     console.log('params',this.pet);
   }
  //================== END ==================//
}
