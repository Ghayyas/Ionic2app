
import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {NavController,AlertController,LoadingController, ToastController, MenuController} from 'ionic-angular';
import {SigninPage} from './signin';
import {SERVER_NAME} from '../../service/dataService/dataService'
import {myEvents} from '../myEvents/myEvents';
import {MyApp} from '../../app';

@Injectable()
export class AuthService {
    // static get parameters() {
    //     return [[Http], [NavController]];
    // }

    static isLoggedin:boolean;
    static nav: NavController;
    static menu: MenuController

    constructor(public http: Http ,nav:NavController, menu:MenuController, private alert: AlertController, private loading: LoadingController
    , private toast:ToastController) {
        this.http = http;
        AuthService.nav = nav;
        AuthService.menu = menu;
        // console.log('objc',nav);
        // AuthService.isLoggedin = false;
    }



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



    login(user) {
        var headers = new Headers();
        var creds = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post(SERVER_NAME +'auth/login', creds, { headers: headers }).subscribe(data => {
               
                if (data.json().token) {
                    window.localStorage.setItem('ecnob.token', data.json().token);
                    window.localStorage.setItem('type',data.json().type);
    //             let getType = window.localStorage.getItem('type');
    //                  if(getType === 1){
    //                     console.log('type value',getType);
    //                        MyApp.companyLogin = true;
    //         }
    //                  else{
    //                      MyApp.companyLogin = false;
    //                      console.log('type value',getType);
    //   }
                    // AuthService.isLoggedin = true;
                   resolve(true);    
            }
            
                

            },(err)=>{
                           
                  console.log('error getting',err,'err json',err.json());    
              
                  let error = err.json();
                  if(error.status_code === 401){
                      this.getalert('Email Or password Not matched')
                      console.log('Email or Password Not found on server');
                  }
                  else{
                      this.getalert('Make Sure you are connected to Internet');
                  }  
                  resolve(false);
                
            });

        });


    }
    // register(user) {

    //     return new Promise(resolve => {
    //         var creds = "name=" + user.name + "&password=" + user.password + "&email="+user.email;

    //         var headers = new Headers();
    //         headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //         this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/signup', creds, { headers: headers }).subscribe(data => {
    //             if (data.json().token){
    //                 window.localStorage.setItem('ecnob.token', data.json().token);
    //                 resolve(true);
    //             }
    //             else
    //                 resolve(false);

    //         });
    //     });

    // }

   

    // static logout() {  
       
    //       AuthService.isLoggedin = false;
    //     //   this.menu.close(); 
    //      AuthService.nav.push(SigninPage);
    //       window.localStorage.clear();
         
    // }
    
    
    
    
    
    
    
    
    
    
    
    
    
   static logout() {

        return new Promise((resolve) => {
                 let token = window.localStorage.clear();
                //  let close = AuthService.menu.close();
                if (token){  
    //         var tab = document.getElementsByTagName("ion-tabs")[0];
    //    var att = document.createAttribute("tabbarplacement");
    // att.value = "bottom";
    // tab.setAttributeNode(att);
    // console.log('page1 done'); 
                    AuthService.menu.close();
                //    AuthService.isLoggedin = false;s
                //    window.localStorage.clear();
                   resolve(true);    
                }
                else{
                    resolve(false);
                }
            })
    }

   

    
}