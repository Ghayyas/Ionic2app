
/**
 * 
 * use less
 * 
 */

import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {DataService,usercreds} from '../../service/dataService/dataService';




@Injectable()
export class AuthService {
    // static get parameters() {
    //     return [[Http], [NavController]];
    // }
    static isLoggedin:boolean;
    constructor(public http:Http) {
        this.http = http;
     
       
    }

    login(user) {
        var headers = new Headers();
        var creds = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {

            this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/login', creds, { headers: headers }).subscribe(data => {

                if (data.json().token) {
                    window.localStorage.setItem('ecnob.token', data.json().token);
                    AuthService.isLoggedin = true;
                }
                resolve(AuthService.isLoggedin);

            });

        });


    }
    // register() {

    //     return new Promise(resolve => {
    //         var creds = DataService.dataArray[0];

    //         var headers = new Headers();
    //         headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //         this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/signup', creds, { headers: headers }).subscribe(data => {
    //             if (data.json().token)
    //                 resolve(true);
    //             else
    //                 resolve(false);

    //         });
    //     });

// }

    // static logout() {
    //     AuthService.isLoggedin = falsee
    //     window.localStorage.clear();
    // }
}