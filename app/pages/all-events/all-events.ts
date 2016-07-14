import {Component} from '@angular/core';
import {NavController,Alert, Loading,MenuController} from 'ionic-angular';
import {EventDetailsPage} from '../event-details/event-details';
import {AllEventFormPage} from '../all-event-form/all-event-form';
import {Http, Headers } from '@angular/http';


/*
  Generated class for the AllEventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-events/all-events.html',
})
export class AllEventsPage {
  eventDetailPage = EventDetailsPage;
  event: [Object];
  arr:[Object];
  public loading: Loading;
  public error: boolean;
  public definedError: boolean;
  
  alleventformscreen = AllEventFormPage;


  // ============== Constructor =============//


  constructor(public nav: NavController, public http:Http, menu: MenuController) {
    this.http = http;
    menu.enable(true);
    this.error = false;
    this.definedError = false;
   
         this.loading = Loading.create({
           content: "Please wait...",
           
           dismissOnPageChange: true
            
        });
  this.nav.present(this.loading);  
    let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.get(' https://nameless-scrubland-35696.herokuapp.com/api/events/eventlist',{headers:headers})
    .subscribe(
      (data)=>{
       this.loading.dismiss();


     

        this.event = data.json().events;
        if(this.event == undefined){
         let alert = Alert.create({
          title: 'Error !',
          subTitle: 'Data Fetching Error!',
          buttons: ['OK']
     });
       this.nav.present(alert);

         this.definedError = true;         //IF DATA IS FROM SERVER IS UNDEFINED

        }
        console.log('data',this.event);
      
     

      },
      (err)=>{
        if (err){
          this.loading.dismiss();
          this.error = true;
          let alert = Alert.create({
          title: 'Error !',
          subTitle: 'Something went wrong!',
          buttons: ['OK']
     });
       this.nav.present(alert);
        }
        console.log('err',err);
        let str = JSON.parse(err._body);
       
      // str = str.replace(/\\/g, '')
      
      if(str.status_code == 500){
        
      let alert = Alert.create({
      title: 'Error !',
      subTitle: 'Internal Server Error Please Contact Application Developer to resolve',
      buttons: ['OK']
    });
    this.nav.present(alert);
  
      }
     else if(str.status_code == 401){
        let alert = Alert.create({
          title: "Error !",
          subTitle: "Your Token is Expire Please logout and signin again",
          buttons : ['OK']
        })
        this.nav.present(alert);
      }
          
          

     
      console.log('status code',str.status_code)
      console.log('error reciveing', str.message);
      }
    )
      
  }
  // getRandom(){

  

    // console.log('params',this.parameters);
    
}
