import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SigninPage} from './pages/signin/signin';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// import {Geolocation} from 'ionic-native';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = SigninPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      console.log('platform works..');
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