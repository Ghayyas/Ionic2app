import {Component} from '@angular/core';
import {NavController, App, Alert, Loading,MenuController} from 'ionic-angular';
import {EventDetailsPage} from '../event-details/event-details';
import {AllEventFormPage} from '../all-event-form/all-event-form';
import {Http, Headers } from '@angular/http';
import {CreateEventPage} from '../create-event/create-event';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {SigninPage} from '../signin/signin';


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
  public type:any;
  alleventformscreen = AllEventFormPage;
  createEvent = CreateEventPage;
  public pet: string;
 

  // ============== Constructor =============//


  constructor(public nav: NavController, public http:Http, menu: MenuController) {


    this.pet = 'private';
    this.http = http;
    this.type = '1';
    this.error = false;
    this.definedError = false;
    
         this.loading = Loading.create({
           content: "Please wait...",
           duration: 300,
           dismissOnPageChange: true
            
        });
  this.nav.present(this.loading);
  // this.loading.dismiss(true);  
  //   let headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  let ecnobToken = window.localStorage.getItem('ecnob.token');
  //  headers.append('Authorization', `Bearer ${ecnobToken}`)
  //   this.http.get( SERVER_NAME +'api/events/eventlist',{headers:headers})
  //   .subscribe(
  //     (data)=>{
  //      this.loading.dismiss(true);


     

  //       this.event = data.json().events;
  //       if(this.event == undefined){
  //        let alert = Alert.create({
  //         title: 'Error !',
  //         subTitle: 'Data Fetching Error!',
  //         buttons: ['OK']
  //    });
  //      this.nav.present(alert);

  //        this.definedError = true;         //IF DATA IS FROM SERVER IS UNDEFINED

  //       }
  //       console.log('data',this.event);
      
     

  //     },
  //     (err)=>{
  //       if (err){
  //         this.loading.dismiss(true);
  //         this.error = true;
  //         let alert = Alert.create({
  //         title: 'Error !',
  //         subTitle: 'Something went wrong!',
  //         buttons: ['OK']
  //    });
  //      this.nav.present(alert);
  //       }
  //       console.log('err',err);
  //       let str = JSON.parse(err._body);
       
  //     // str = str.replace(/\\/g, '')
      
  //     if(str.status_code == 500){
        
  //     let alert = Alert.create({
  //     title: 'Error !',
  //     subTitle: 'Internal Server Error Please Contact Application Developer to resolve',
  //     buttons: ['OK']
  //   });
  //   this.nav.present(alert);
  
  //     }
  //    else if(str.status_code == 401){
  //       let alert = Alert.create({
  //         title: "Error !",
  //         subTitle: "Your Token is Expire Please logout and signin again",
  //         buttons : ['OK']
  //       })
  //       this.nav.present(alert);
  //     }
          
          

     
  //     console.log('status code',str.status_code)
  //     console.log('error reciveing', str.message);
  //     }
  //   )
      
  }
  
// ionViewDidEnter(){
//   this.nav.setRoot(SigninPage).then((data)=>{
//     console.log('data',data);
//   },(err)=>{
//     console.log('err',err)
//   })
// }

  
   myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
   btn(){
     console.log('my btn');
   }
  newTabs(){
    // this.nav.setRoot(EventDetailsPage).then((data)=>{
    //   console.log('setting root',data)
    //   this.nav.rootNav.push(data)
    // },(err)=>{
    //   console.log('gettomg err');
    // })
    //  this.nav.setRoot(EventDetailsPage);
    this.nav.rootNav.push(EventDetailsPage)    
  }

    // console.log('params',this.parameters);
    
}
