import {Component,Inject, ViewChild} from "@angular/core";
// import {Inject, ViewChild} from 'angular2/core';

import {Platform, ionicBootstrap,MenuController, NavController,Keyboard} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {EventDetailsPage} from './pages/event-details/event-details'; 
import {AuthService} from "./pages/signin/authservice";


// import {Geolocation} from 'ionic-native';



@Component({
  templateUrl: 'build/app.html'
//   <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>


//   <ion-menu [content]="content">



//   <ion-content>
//   </ion-content>

// </ion-menu>

// <ion-overlay></ion-overlay>
  
  
})
export class MyApp {
  rootPage: any = TabsPage;
  // pages: Array<{title: string, component: any}>
 @ViewChild('content') nav: NavController;


public local = null;

  constructor(platform: Platform, public menu: MenuController) {
          
  
    platform.ready().then(() => {
      console.log('platform works..');
      this.menu.enable(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Keyboard.disableScroll(true);
      // Keyboard.
      StatusBar.styleDefault();
     

    }

    )}
     
ngAfterViewInit(){
     
      let local =  window.localStorage.getItem('ecnob.token');
      if(local == null){
       this.nav.rootNav.push(SigninPage);
        this.menu.enable(false);
      }
}



     //======================== LOG OUT FUNCTION ===================///
    logout(){
     
      localStorage.clear();
      console.log('loogin out');
       this.menu.close();
      this.menu.enable(false);
      this.nav.rootNav.push(SigninPage)
    //  AuthService.logout();

    
    }
}
//============================== END ===============================//


ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ])