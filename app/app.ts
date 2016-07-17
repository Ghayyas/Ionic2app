import {Component} from "@angular/core";
import {Platform, ionicBootstrap,MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {EventDetailsPage} from './pages/event-details/event-details'; 
import {AuthService} from "./service/auth/authservice";


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
  rootPage: any = SigninPage;
  // pages: Array<{title: string, component: any}>




  constructor(platform: Platform, menu: MenuController) {
          // this.nav.viewDidEnter.subscribe((view) => { console.log(view.instance.constructor.name); });
     
    platform.ready().then(() => {
      console.log('platform works..');
      menu.enable(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

  }

    )}
    
    logout(){
      console.log('loogin out');
      AuthService.logout();
    }
}



ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ])