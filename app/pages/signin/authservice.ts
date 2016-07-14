
import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {NavController,Alert} from 'ionic-angular';


@Injectable()
export class AuthService {
    // static get parameters() {
    //     return [[Http], [NavController]];
    // }

    isLoggedin:boolean;

    constructor(public http: Http, public nav:NavController) {
        this.http = http;
        this.nav = nav;
        this.isLoggedin = false;
    }



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



    login(user) {
        var headers = new Headers();
        var creds = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve) => {

            this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/login', creds, { headers: headers }).subscribe(data => {

                if (data.json().token) {
                    window.localStorage.setItem('ecnob.token', data.json().token);
                    this.isLoggedin = true;
                   resolve(true);    
            }
            
                

            },(err)=>{
                           
                  console.log('error getting',err,'err json',err.json());       
                  let error = err.json();
                  if(error.status_code === 401){
                      this.getalert('Error','Email Or password Not matched')
                      console.log('Email or Password Not found on server');
                  }
                  else{
                      this.getalert('Error',"Make Sure you have Connected to Internet");
                  }  
                  resolve(false);
                
            });

        });


    }
    register(user) {

        return new Promise(resolve => {
            var creds = "name=" + user.name + "&password=" + user.password + "&email="+user.email;

            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/signup', creds, { headers: headers }).subscribe(data => {
                if (data.json().token){
                    window.localStorage.setItem('ecnob.token', data.json().token);
                    resolve(true);
                }
                else
                    resolve(false);

            });
        });

    }

    logout() {
        this.isLoggedin = false;
        window.localStorage.clear();
    }
}