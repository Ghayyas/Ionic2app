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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
//       Geolocation.getCurrentPosition().then((resp) => {
//      var cd  = resp.coords.latitude;
//     var ab =  resp.coords.longitude;
//  console.log('cordova latitude',cd)
//  console.log('cordova longitude',ab)
// },(err)=>{
//   if(err.code === 1){
//     alert('we need to access your Location in order to access this app');
//     platform.exitApp()
//     //return;
//   }
//   console.log('reciveing error ',err);
// })
//     });
  }

    )}
}



ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms()
 ])