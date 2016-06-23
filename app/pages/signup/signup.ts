import {Component} from '@angular/core';
import {NavController, Page, Loading} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../signin/authservice';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Page({
		templateUrl: 'build/pages/signup/signup.html',
		providers: [AuthService]
})

export class SignupPage {
  gotohomescreen = TabsPage;
  signinPage = SigninPage;

  authservice = null;
  token = null;

  usercreds = {
	  email: '',
	  password: '',
	  name: ''
  }


  /**
   * [constructor description]
   * @param {NavController} public nav [description]
   */
  constructor(public auth: AuthService, public nav: NavController) {
	  this.authservice = auth;
	  this.nav = nav;
	  this.token = window.localStorage.getItem('ecnob.token');
	  if (this.token != null) {
		  this.nav.setRoot(TabsPage);
	  }   

  }


  /**
   * [login description]
   * @param {[type]} usercreds [description]
   */
  register(usercreds) {
	  let loading = Loading.create({
		  content: "Please wait...",
		  duration: 3000,
		  dismissOnPageChange: true
	  });
	  this.nav.present(loading);

	  this.authservice.register(usercreds).then(data => {
		  if (data) {
			  this.nav.setRoot(TabsPage);
		  }
	  })
  }


}
