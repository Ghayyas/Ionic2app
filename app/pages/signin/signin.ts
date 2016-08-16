import {Component} from '@angular/core';
import {NavController, Page ,ToastController, LoadingController,AlertController,MenuController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {Keyboard} from 'ionic-native';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from './authservice';
import {profile} from "../profile/profile";
import {MyApp} from '../../app';


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



   constructor(public auth: AuthService, public nav: NavController, public menu: MenuController,
   private alert: AlertController, private loading: LoadingController,private toast: ToastController) { 
   this.menu.enable(false);
    this.authservice = auth;
	   this.nav = nav;
      var tab = document.getElementsByTagName("ion-tabbar")[0];
      if(tab){
   var att = document.createAttribute("class");
    att.value = "displaynone";
    tab.setAttributeNode(att);
      }
     window.addEventListener('native.keyboardshow', ()=>{
         let keyboardHide = document.getElementById('keyboardhide');
     
          keyboardHide.classList.add('keyboardHide');


         console.log('from signin ts keyboard is showing..');
       });


        window.addEventListener('native.keyboardhide', ()=>{
         let keyboardHide = document.getElementById('keyboardhide');

         keyboardHide.classList.remove('keyboardHide');

           console.log('from signin ts keyboard is hiding');
        })

     
    //   window.addEventListener('native.keyboardshow', function(){
    //   document.body.classList.add('keyboard-open');
    // });
     
    //  else if(this.keyboard.onClose){
    //   let keyboardHide = document.getElementsByTagName('ion-footer')[0];
    
    //    var att = document.createAttribute('class');
    //    att.value = 'keyboardclose';
    //     //  keyboardHide.className = '';
    //    keyboardHide.setAttributeNode(att);
    //  }
     //  var tab = document.getElementsByTagName("ion-tabs")[0];
  //  var att = document.createAttribute("tabbarplacement");
  //   att.value = "bottom";
  //   tab.setAttributeNode(att);
    //  keyboardCheck(){
      // setTimeout(function() {
        
      // }, timeout);
      

// }
      
	  //  this.token= window.localStorage.getItem('ecnob.token');
    //    if(this.token !== null)
	  //  {
    //   // this.menu.enable(true);
		//    this.nav.setRoot(TabsPage);
        
       
	  //  }   

   }
   

  //  keyboardOpen(){
  //       setTimeout(() =>{
  //       console.log('is the keyboard open ', this.keyboard.isOpen());
  //       if(this.keyboard.isOpen()){
  //      console.log('keyboard is open')
  //      let keyboardHide = document.getElementsByTagName('ion-footer')[0];
  //      var att = document.createAttribute('class');
  //      att.value = 'keyboardHide';
  //      keyboardHide.setAttributeNode(att);
  //    }
  //     },1000);     
  //  }




//============ VIEW ENTER ==========//

ionViewWillEnter(){
 this.menu.enable(false);    //By Default Side menu will not be enable on sign in page..
 console.log('menu false');

}

//=============END ============//

   
   //=============== Alert Funciton =================//
   
     getalert(msg){
       let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
     }
  
  //================= Alert END =============//
  
   /**
    * [login description]
    * @param {[type]} usercreds [description]
    */
   login(usercreds) {
              //  console.log('users',usercreds)
	   let loading = this.loading.create({
		   content: "Please wait...",
		  //  duration: 3000,
		   dismissOnPageChange: true
	   });
	   loading.present(loading);
      //  let getType = window.localStorage.getItem('type');
	    this.authservice.login(usercreds).then(data => {
		 let timeout =   setTimeout(function() {
         loading.dismiss(true);
       }, 3000);
       if (data){
        this.nav.setRoot(TabsPage);
         clearTimeout(timeout);
 }
		   })
   }
      
	  //  })
  //  }

}
