import {Component,Inject, ViewChild} from "@angular/core";
import {Platform, ionicBootstrap,MenuController, NavController,Keyboard} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {EventDetailsPage} from './pages/event-details/event-details'; 
import {AuthService} from "./pages/signin/authservice";
import {myEvents} from "./pages/myEvents/myEvents";
import {Page1} from './pages/page1/page1';

import {Geolocation} from 'ionic-native';

declare var navigator:any;
declare var cordova:any;


@Component({
  templateUrl: 'build/app.html',
    providers: [AuthService]
})


export class MyApp {
  rootPage: any;
  userEvents: any = myEvents;
  // static companyLogin:boolean;

 @ViewChild('content') nav: NavController;


public local = null;

 
  constructor(platform: Platform, public menu: MenuController, keyboard: Keyboard) {
 
   
    platform.ready().then(() => {
      console.log('platform works..');
      Splashscreen.hide();
      StatusBar.styleDefault();
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    // keyboard.disableScroll(true)
    
      let local =  window.localStorage.getItem('ecnob.token');
      let getType = window.localStorage.getItem('type');
       if(local == null){
        this.rootPage = SigninPage;
        //  console.log("app ts root Nav");
        this.menu.enable(false);
      }
      else{
      //   if(getType == 1){
      //     console.log('type value',getType);
      //     MyApp.companyLogin = true;
      //    }
      //  else{
      //     MyApp.companyLogin = false;
      //      console.log('type value',getType);
      //     }
          this.menu.enable(true);
          this.rootPage  = TabsPage;
      //  console.log('company login',MyApp.companyLogin);
      }
     
      
    }

    )}
     

  
//================ MY Events Screen =============//
  
    goEvents(){

      this.nav.push(myEvents);

  
}
//================ MY Events Screen  END  =============//
     
     
     
     
     //======================== LOG OUT FUNCTION ===================///
    logout(){
     AuthService.logout().then((succ)=>{
    
      console.log('loogin out');
 
      this.menu.enable(false);
      this.nav.setRoot(SigninPage);
    
     },(err)=>{
       console.log('getting error',err);
       window.alert('Something went wrong.. Please try again');
     })



    
    }
}
//============================== END ===============================//


ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ],{tabsPlacement: "bottom",tabsHideOnSubPages: false,
      tabsHighlight: false})
