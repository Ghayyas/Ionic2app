import {Component} from '@angular/core';
import {NavController, Page, Loading,Alert,MenuController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from './authservice';
import {profile} from "../profile/profile";


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
   signupPage = SignupPage;  ///profile page for now cna pe change to signupPage after
   authservice = null;
   token = null;

   usercreds = {
   	email: '',
   	password: ''
   }



   constructor(public auth: AuthService, public nav: NavController, public menu: MenuController) { 
   this.menu.enable(false);
    this.authservice = auth;
	   this.nav = nav;
	  //  this.token= window.localStorage.getItem('ecnob.token');
    //    if(this.token !== null)
	  //  {
    //   // this.menu.enable(true);
		//    this.nav.setRoot(TabsPage);
        
       
	  //  }   

   }


ionViewWillEnter(){
 this.menu.enable(false);
 console.log('menu false');
// }


//============ VIEW ENTER ==========//

// ionViewWillEnter(){

    // let loading = Loading.create({
		//    content: "Please wait...",
		//   //  duration: 3000,
		//    dismissOnPageChange: true
	  //  });
	  //  this.nav.present(loading);

}

//=============END ============//

   
   //=============== Alert Funciton =================//
   
     getalert(data,msg){
       let alert = Alert.create({
                   title: data,
                   subTitle: msg,
                   buttons: ['OK']
                 });
                      this.nav.present(alert);
     }
  
  //================= Alert END =============//
  
   /**
    * [login description]
    * @param {[type]} usercreds [description]
    */
   login(usercreds) {
              //  console.log('users',usercreds)
	   let loading = Loading.create({
		   content: "Please wait...",
		  //  duration: 3000,
		   dismissOnPageChange: true
	   });
	   this.nav.present(loading);

	   this.authservice.login(usercreds).then(data => {
		  
       loading.dismiss(true);
       if (data){
			   this.nav.setRoot(TabsPage);
		   }
      
	   })
   }

}
