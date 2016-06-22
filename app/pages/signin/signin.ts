import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the SigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signin/signin.html',
})
export class SigninPage {
   homescreen = TabsPage;
   signupPage = SignupPage;
  constructor(public nav: NavController) {}
}
