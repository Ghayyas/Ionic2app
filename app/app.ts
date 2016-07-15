import {Component} from "@angular/core";
import {Platform, ionicBootstrap,MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// import {Geolocation} from 'ionic-native';



@Component({
  template: `
  <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>

  <ion-menu [content]="content">

  <ion-toolbar>
    <ion-title>Menu</ion-title>
  </ion-toolbar>

  <ion-content>
    <ion-list>
      <button ion-item>
       my Page
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<ion-overlay></ion-overlay>
  
  `
})
export class MyApp {
  rootPage: any = SigninPage;
  // pages: Array<{title: string, component: any}>

  constructor(platform: Platform, menu: MenuController) {

    platform.ready().then(() => {
      console.log('platform works..');
      menu.enable(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
  }

    )}
}



ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ])