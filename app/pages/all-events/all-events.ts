import {Component} from '@angular/core';
import {NavController, App, Alert, Loading,MenuController} from 'ionic-angular';
import {EventDetailsPage} from '../event-details/event-details';
import {AllEventFormPage} from '../all-event-form/all-event-form';
import {Http, Headers } from '@angular/http';
import {CreateEventPage} from '../create-event/create-event';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {SigninPage} from '../signin/signin';
import {limit} from '../limit';


/*
  Generated class for the AllEventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/all-events/all-events.html',
   pipes: [limit]
})
export class AllEventsPage {
  eventDetailPage = EventDetailsPage;
  event: [Object];
  arr:[Object];
  public events: [Object];
  public loading: Loading;
  public error: boolean;
  public definedError: boolean;
  public type:any;
  alleventformscreen = AllEventFormPage;
  createEvent = CreateEventPage;
  public pet: string;
  public allEventsArray = [];

  // ============== Constructor =============//


  constructor(public nav: NavController, public http:Http, menu: MenuController) {


    this.pet = 'public';
    this.http = http;
    this.type = '1';
    this.error = false;
    this.definedError = false;
    
         this.loading = Loading.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
            
        });
  this.nav.present(this.loading);



    //======================= Event Array LOCAL API ===================== //



  //       this.events = [
  //   {
  //     "id": 1,
  //     "name": "New Year Celeberation",
  //     "longitude": "24.964287",
  //     "latitude": "66.8815706",
  //     "start_date": "31-12-2016",
  //     "end_date": "1-1-2017",
  //     "photo": "http://lilanisoft.com/hotworks/api/images/1468500596.jpg",
  //     "description": "Happy new year",
  //     "user_id": 1,
  //     "type": 0,
  //     "created_at": "2016-07-14 12:53:55",
  //     "updated_at": "2016-07-14 12:53:55"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Birthday Celeberation",
  //     "longitude": "24.964287",
  //     "latitude": "66.8815706",
  //     "start_date": "15-7-2016",
  //     "end_date": "20-7-2017",
  //     "photo": "http://lilanisoft.com/hotworks/api/images/1468501024.jpg",
  //     "description": "Birthday",
  //     "user_id": 1,
  //     "type": 1,
  //     "created_at": "2016-07-14 12:57:16",
  //     "updated_at": "2016-07-14 12:57:16"
  //   }
  // ]









//========================== EVENT ARRAY END =========================//


      
  }
  

ionViewWillEnter(){
    let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.get( SERVER_NAME +'events/eventlist',{headers:headers})
    .subscribe(
      (data)=>{
        console.log('data',data);
       this.loading.dismiss(true);
       this.event = data.json().events;
        if(this.event == undefined){


         this.definedError = true;         //IF DATA FROM SERVER IS UNDEFINED

        }
        this.allEventsArray.push(this.event);
        console.log('events Array',this.allEventsArray);
        console.log('data',this.event);
      
     

      },
      (err)=>{
    console.log('err',err);
        if (err){
          this.loading.dismiss(true);
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
  
   myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
   btn(){
     console.log('my btn');
   }
  newTabs(i){
    console.log('getting array',this.allEventsArray);
    
      let loading = Loading.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
  
    console.log('index');
    this.nav.rootNav.push(EventDetailsPage,{ paramUser: this.allEventsArray, paramID: i});    
    this.nav.present(loading);  
}

    // console.log('params',this.parameters);
    
}
