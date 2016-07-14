import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {DataService,usercreds} from '../../service/dataService/dataService';



@Injectable()
export class AuthService {
    // static get parameters() {
    //     return [[Http], [NavController]];
    // }
    public isLoggedin:boolean;
    constructor(public http:Http) {
        this.http = http;
        this.isLoggedin = false;
    }

    login(user) {
        var headers = new Headers();
        var creds = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {

            this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/auth/login', creds, { headers: headers }).subscribe(data => {

                if (data.json().token) {
                    window.localStorage.setItem('ecnob.token', data.json().token);
                    this.isLoggedin = true;
                }
                resolve(this.isLoggedin);

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

    }

    logout() {
        this.isLoggedin = false;
        window.localStorage.clear();
    }
}