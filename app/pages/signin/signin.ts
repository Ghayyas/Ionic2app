import {Component} from '@angular/core';
import {NavController, Page, Loading} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from './authservice';

/*
  Generated class for the SigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/signin/signin.html',
  providers: [AuthService]
})
export class SigninPage {
   

   homescreen = TabsPage;
   signupPage = SignupPage;
   authservice = null;
   token = null;

   usercreds = {
   	email: '',
   	password: ''
   }



   constructor(public auth: AuthService, public nav: NavController) { 
	   this.authservice = auth;
	   this.nav = nav;
	   this.token= window.localStorage.getItem('ecnob.token');
	   if(this.token != null)
	   {
		   this.nav.setRoot(TabsPage);
	   }   
   }

   /**
    * [login description]
    * @param {[type]} usercreds [description]
    */
   login(usercreds) {
              //  console.log('users',usercreds)
	   let loading = Loading.create({
		   content: "Please wait...",
		   duration: 3000,
		   dismissOnPageChange: true
	   });
	   this.nav.present(loading);

	  //  this.authservice.login(usercreds).then(data => {
		  //  if (data){
			   this.nav.setRoot(TabsPage);
		  //  }
	  //  })
   }

}
