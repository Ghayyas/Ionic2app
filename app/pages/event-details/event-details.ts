import {Component} from '@angular/core';
import {NavController,NavParams,Loading,Alert} from 'ionic-angular';
import { DataService } from '../../service/dataService/dataService';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {AllEventsPage} from '../all-events/all-events';






/*
  Generated class for the EventDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

//  declare var name:any;

@Component({
  templateUrl: 'build/pages/event-details/event-details.html',
})
export class EventDetailsPage {
 public eventDetailArray: any;
 public myArray = [];
 public loading: any;
  constructor(public nav: NavController, public http:Http, private params:NavParams) {
    // this.nav.viewDidEnter.subscribe((view) => { 
    this.http = http;
    this.nav = nav;
  
      
    // });
  }
  goBack(){
		this.nav.pop();
	}
  
  ionViewWillEnter(){
   this.loading = Loading.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
            
        });
  this.nav.present(this.loading);
  
  // console.log('events detail', AllEventsPage.allEventsArray);
  // loading.dismiss(true);
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let ecnobToken = window.localStorage.getItem('ecnob.token');
      headers.append('Authorization', `Bearer ${ecnobToken}`)
        this.http.get(SERVER_NAME + 'events/detail',{headers:headers})
        .subscribe((data)=>{
            console.log('data recivng',data);
            console.log('dataJson',data.json());
             let dataJson = data.json().events;
            let para =  this.params.get('paramUser');
            console.log('getting params',para);
            for(var i = 0; i < dataJson.length; i++){
              if(dataJson[i].id === para){
                this.eventDetailArray = dataJson[i];
                this.myArray.push(this.eventDetailArray);
                 console.log('array',this.myArray);
                 this.loading.dismiss(true);
              }
            }
        },(err)=>{
           this.loading.dismiss(true);
      let alert = Alert.create({
      title: 'Error !',
      subTitle: 'Error in getting response Please Check if you have working internet connection and Valid Token.',
      buttons: ['OK']
    });
    this.nav.present(alert);
        console.log('error recing',err);
        console.log('err Josn',err.json());
        })
  }
  pop(){
    this.nav.pop();
  }
}
