import {Component,Directive,Input,Output, EventEmitter} from '@angular/core';
import {NavController, Page, Loading,Platform,Alert} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {NgZone} from "@angular/core";
import { EqualValidator } from '../../service/equal-validator-service/equal-validator.directive';

import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../signin/authservice';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {DataService,usercreds} from '../../service/dataService/dataService';
import {profile} from "../profile/profile";
import {locationPage} from '../location/location';
import {Geolocation} from "ionic-native";
import {Http, Headers} from '@angular/http';

// import {location} from "../location/location"


/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Page({
		templateUrl: 'build/pages/signup/signup.html',
		providers: [AuthService,DataService,RADIO_GROUP_DIRECTIVES],
      directives: [EqualValidator]

})


export class SignupPage {
  gotohomescreen = TabsPage;
  signinPage = SigninPage;
  profilePage = profile;
  public emailExist:boolean
  static clickLength : number;
  static userClickLength: number
 
  token = null;

  
   usercreds = {
	  email: '',
	  password: '',
    confirmPassword: '',
	  name: '',
    type: '0',
    photo: null,
    longitude: null,
    latitude: null,
    radius: 3
    
  }

  /**
   * [constructor description]
   * @param {NavController} public nav [description]
   */
  constructor(public auth: AuthService, public nav: NavController, public data: DataService,platform:Platform,public http:Http) {
   this.http = http;
	  // this.authservice = auth;
	  this.nav = nav;
    SignupPage.clickLength = 1;
    SignupPage.userClickLength = 1;
    this.emailExist = false;
	  this.token = window.localStorage.getItem('ecnob.token');
	  if (this.token != null) {
		  this.nav.setRoot(TabsPage);
	  }   

  }




  /**
   * [login description]
   * @param {[type]} usercreds [description]
   */

 //========================= Register Function ===========================//
  
  signup() {
     console.log('data',this.usercreds.email,this.usercreds.password,this.usercreds.type);
	  let loading = Loading.create({
		  content: "Please wait...",
		  //  duration: 300,
		  dismissOnPageChange: true
	  });
	  this.nav.present(loading);

    var headers = new Headers();
        var creds = "email=" + this.usercreds.email;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

   let email = "email "+this.usercreds.email 
    this.http.post(SERVER_NAME+'auth/checkemail',creds, { headers: headers }).subscribe((data)=>{
        console.log('email found',data.json());
        let success = data.json().success;
        loading.dismiss()
        if(success !== true){
          var obj = new usercreds(this.usercreds.email,this.usercreds.password,this.usercreds.name,this.usercreds.type,this.usercreds.photo,this.usercreds.latitude,this.usercreds.longitude,this.usercreds.radius);
          DataService.pushData(obj).then((data)=>{
           console.log('reciveing data',data);
       
       if(data == true){

    //       let alert = Alert.create({
    //   title: 'success !',
    //   subTitle: 'Make Sure you have working internet connection',
    //   buttons: ['OK']
    // });
    //    this.nav.present(alert);

         this.nav.push(profile);
       }
     else{
       alert('Oppss! Something went wrong. Make sure you allows Geolocation from your device and try again')
     }
   },(err)=>{
     console.log('reciveing error',err)
   });
        }
        else{
          this.emailExist = true;
        }
    },(err)=>{
      loading.dismiss();
      let alert = Alert.create({
      title: 'ERROR !',
      subTitle: 'Make Sure you have working internet connection',
      buttons: ['OK']
    });
       this.nav.present(alert);
        // alert('Error Make Sure you have working internet connection');
      console.log('email not found',err.json());
    })
  
  }
//============================== END =================================//

//===================== Two Times Calling ======================//
  myUserSegmentClick(){
      
  document.getElementById('companyseg').classList.remove('activated');
   console.log('class remove successfullly');
 
  }
  myCompanyClick(){
        document.getElementById('userSeg').classList.remove('activated');
        console.log('class remove successfullly');


  }
  

//======================= END ==============================//

}
