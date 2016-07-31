import {Component,Inject, ViewChild} from "@angular/core";
// import {Inject, ViewChild} from 'angular2/core';

import {Platform, ionicBootstrap,MenuController, NavController,Keyboard} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {EventDetailsPage} from './pages/event-details/event-details'; 
import {AuthService} from "./pages/signin/authservice";
import {myEvents} from "./pages/myEvents/myEvents";
import {Page1} from './pages/page1/page1';

import {Geolocation} from 'ionic-native';

declare var navigator:any;

@Component({
  templateUrl: 'build/app.html',
    providers: [AuthService]

//   <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>


//   <ion-menu [content]="content">



//   <ion-content>
//   </ion-content>

// </ion-menu>

// <ion-overlay></ion-overlay>
  
  
})
export class MyApp {
  rootPage: any = TabsPage;
  userEvents: any = myEvents;
  // pages: Array<{title: string, component: any}>
 @ViewChild('content') nav: NavController;


public local = null;
// public nav: NavController;
 
  constructor(platform: Platform, public menu: MenuController) {
          // this.nav = nav;
  
    platform.ready().then(() => {
      console.log('platform works..');
      StatusBar.styleDefault();
      console.log("hidding Splash screen...");
      this.hideSplashScreen();
      console.log("hide splash screen");
        let local =  window.localStorage.getItem('ecnob.token');
         if(local == null){
           this.nav.setRoot(SigninPage).then((suc)=>{
             console.log("app ts root Nav");
                       this.menu.enable(false);

            //  this.nav.rootNav.push(SigninPage);

           })
      }
      
    }

    )}
     
ngAfterViewInit(){
     console.log('platform works before')
     
}
  
  hideSplashScreen(){
    if(Splashscreen){
       setTimeout(()=>{
         Splashscreen.hide();
       },700)
    }
      
    console.log('hello splash');
    
  }
  
    goEvents(){
    //  this.rootPage = page;

      this.nav.push(myEvents);
  // this.nav.push(myEvents).then((suc)=>{
  // console.log('successfully remove');
  // this.nav.push(myEvents);
  // },(err)=>{
  //  console.log('getting error',err);
  // })

  // this.nav.rootNav.push(TabsPage).then((suc)=>{
  //  console.log('set root sucess',suc);
  //  this.nav.push(myEvents)
  //  console.log('works');
  // },(err)=>{
  //   console.log('nav error',err);
  // })
  
}

     //======================== LOG OUT FUNCTION ===================///
    logout(){
     AuthService.logout().then((succ)=>{
      // window.localStorage.clear();
      console.log('loogin out');
      //  this.menu.close();
      this.menu.enable(false);
      this.nav.rootNav.push(SigninPage)       
     },(err)=>{
       console.log('getting error',err);
       window.alert('Something went wrong.. Please try again');
     })

    //  AuthService.logout();

    
    }
}
//============================== END ===============================//


ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ])