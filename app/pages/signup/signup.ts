import {Component,Directive,Input,Output, EventEmitter} from '@angular/core';
import {NavController, Page, LoadingController,Platform,AlertController} from 'ionic-angular';
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
  static lat:number;
  static long: number
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
  constructor(public auth: AuthService, public nav: NavController, public data: DataService,platform:Platform,public http:Http,
  private loading: LoadingController, private alert: AlertController) {
   this.http = http;
	  // this.authservice = auth;
	  this.nav = nav;
    SignupPage.clickLength = 1;
    SignupPage.userClickLength = 1;
     window.addEventListener('native.keyboardshow', ()=>{
         let KeyboardHide1 = document.getElementById('keyboardhide1');
          KeyboardHide1.classList.add('keyboardHide');
       });
        window.addEventListener('native.keyboardhide', ()=>{
         let KeyboardHide1 = document.getElementById('keyboardhide1');
         KeyboardHide1.classList.remove('keyboardHide');
           console.log('from signUp ts keyboard is hiding');
        });



  //   Geolocation.getCurrentPosition().then((resp) => {
  //    SignupPage.lat  = resp.coords.latitude;
  //    SignupPage.long =  resp.coords.longitude;
  //    console.log('cordova latitude',SignupPage.lat);
  //   console.log('cordova longitude',SignupPage.long);


    
  //   },(err)=>{
  // if(err.code === 1){
  //   window.alert('we need to access your Location in order to access this app');
  //   // platform.exitApp()
  //   //return;
  // }
  // else{
  //     window.alert('Could not fetch you location please check your Internet connection and try again');
  // }
  // console.log('reciveing error ',err);
// }) 
    this.emailExist = false;   //by Default Email exist false

	  // this.token = window.localStorage.getItem('ecnob.token');
	  // if (this.token != null) {
		//   this.nav.setRoot(TabsPage);
	  // }   

  }




  /**
   * [login description]
   * @param {[type]} usercreds [description]
   */

 //========================= Register Function ===========================//
  
  signup() {
     console.log('data',this.usercreds.email,this.usercreds.password,this.usercreds.type);
	  let loading = this.loading.create({
		  content: "Please wait...",
		  //  duration: 300,
		  dismissOnPageChange: true
	  });
	  loading.present(loading);

    var headers = new Headers();
        var creds = "email=" + this.usercreds.email;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

   let email = "email "+this.usercreds.email 
    this.http.post(SERVER_NAME+'auth/checkemail',creds, { headers: headers }).subscribe((data)=>{
        console.log('email found',data.json());
        let success = data.json().success;
        loading.dismiss();
        if(success !== true){
          let loading = this.loading.create({
		        content: "Please wait...",
		  //  duration: 300,
		        dismissOnPageChange: true
	  });
	  loading.present(loading);
          var obj = new usercreds(this.usercreds.email,this.usercreds.password,this.usercreds.name,this.usercreds.type,this.usercreds.photo,this.usercreds.latitude,this.usercreds.longitude,this.usercreds.radius);
 
          DataService.pushData(obj).then((data)=>{
             setTimeout(function() {
        loading.dismiss();
      }, 3000);
               console.log('reciveing data',data);
       
               if(data){

                this.nav.push(profile);
               }
             else{
               
        setTimeout(function() {
        loading.dismiss();
      }, 3000);
               if(DataService.code == 1){
                    let alert = this.alert.create({
                     title: 'ERROR !',
                     subTitle: 'GPS must enable in order to perform action',
                     buttons: ['OK']
      });
                     alert.present();
            }
    
                if(DataService.code == 2){
               let alert = this.alert.create({
                     title: 'ERROR !',
                     subTitle: 'Could not fetch your location. Make sure you have working internet connection',
                     buttons: ['OK']
      });
                     alert.present();
                // window.alert('Could Not Fetch Your location. Make Sure you have Working Internet Connection')
            }
                 if(DataService.code == 3){
               let alert = this.alert.create({
                     title: 'ERROR !',
                     subTitle: 'Slow Internet Connection make sure your GPS in enable and try again..',
                     buttons: ['OK']
      });
                    alert.present();
                // window.alert('Could Not Fetch Your location. Make Sure you have Working Internet Connection')
            }
     

      //  alert('Oppss! Something went wrong. Make sure you allows Geolocation from your device and try again')
     }
   });
      }
        else{
          this.emailExist = true;
        }
    },(err)=>{
      setTimeout(function() {
        loading.dismiss();
      }, 3000);
      
      let alert = this.alert.create({
      title: 'ERROR !',
      subTitle: 'Make Sure you have working internet connection',
      buttons: ['OK']
    });
       alert.present();
        // alert('Error Make Sure you have working internet connection');
      console.log('email not found',err.json());
    })
  
  }
//============================== END =================================//




//===================== custom css for remove borderbottom on some devices  ======================//
 
  myUserSegmentClick(){
      
  document.getElementById('companyseg').classList.remove('activated');  // Remove Class Activated 
  //  console.log('class remove successfullly');
 
  }
  myCompanyClick(){
        document.getElementById('userSeg').classList.remove('activated');   // Remove Class Activated 
        // console.log('class remove successfullly');


  }
  

//======================= END ==============================//

}
