import {Component,Directive,Input,Output, EventEmitter} from '@angular/core';
import {NavController, Page, Loading} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NgZone} from "@angular/core";

import {
  Control,
  ControlGroup,
  NgForm,
  Validators,
  NgControl,
  ControlValueAccessor,
  NgControlName,
  NgFormModel,
  FormBuilder,
  
} from '@angular/common';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../signin/authservice';

import {DataService,usercreds} from '../../service/dataService/dataService';
import {profile} from "../profile/profile"


/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Page({
		templateUrl: 'build/pages/signup/signup.html',
		providers: [AuthService,DataService,RADIO_GROUP_DIRECTIVES]
})


export class SignupPage {
  gotohomescreen = TabsPage;
  signinPage = SigninPage;
  profilePage = profile;

  authservice = null;
  token = null;
  // DataService = null; 
  
   usercreds = {
	  email: '',
	  password: '',
	  name: '',
    type: '',
    photo: null,
  }


  /**
   * [constructor description]
   * @param {NavController} public nav [description]
   */
  constructor(public auth: AuthService, public nav: NavController, public data: DataService) {
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
  register() {
	  let loading = Loading.create({
		  content: "Please wait...",
		  duration: 300,
		  dismissOnPageChange: true
	  });
	  this.nav.present(loading);
    
    var obj = new usercreds(this.usercreds.email,this.usercreds.password,this.usercreds.name,this.usercreds.type,this.usercreds.photo);
   DataService.pushData(obj);
    // DataService.dataArray.push(obj);
    // DataService.getData();
    console.log('object value',obj,this.usercreds.email)
    	this.nav.push(profile);
	  // this.authservice.register(usercreds).then(data => {
		//   if (data) {
		// 	  this.nav.setRoot(TabsPage);
		//   }
	  // })
  }


}
