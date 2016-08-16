import {Component} from '@angular/core';
import {NavController,NavParams,Loading,Alert,ToastController,MenuController} from 'ionic-angular';
import { DataService } from '../../service/dataService/dataService';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {AllEventsPage} from '../all-events/all-events';
import {SigninPage} from '../signin/signin';





/*
  Generated class for the EventDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

//  declare var name:any;

@Component({
  templateUrl: 'build/pages/event-details/event-details.html',
})

/**
 * 
 * Event Detail Class
 * 
 */


export class EventDetailsPage {
 public eventDetailArray: any;
 public myArray = [];
 public selected;
 public allEventsArray = [];
 public loading: any;
  constructor(public nav: NavController, public http:Http, private params:NavParams, private toast: ToastController,
  private menu: MenuController) {
    // this.nav.viewDidEnter.subscribe((view) => { 
    this.http = http;
    this.nav = nav;
  // this.loading.dismiss(true);
  let eventPageDetail = this.allEventsArray;
  // for(var i = 0; i < eventPageDetail.length;i++){
    let para =  this.params.get('paramUser');
    let pramget = this.params.get('paramID');
    console.log('para',pramget);
  let taber = document.getElementsByTagName("ion-tabbar")[0];
   taber.setAttribute('class','hide-tabbar');

    console.log('events detail', para[0][pramget]);
  
   this.allEventsArray.push(para[0][pramget]);
      //  console.log('events detail', this.allEventsArray[pramget]);

    //  if(eventPageDetail[i].id === para){
    //      this.eventDetailArray = eventPageDetail[i];
    //      this.myArray.push(this.eventDetailArray);
    //       console.log('array',this.myArray);
    //             //  this.loading.dismiss(true);
    //           }
      // console.log('data getting',eventPageDetail[i].name)
      
    // });
  // }
  }
  ionViewWillLeave(){
    this.allEventsArray = [];
    console.log('events array',this.allEventsArray);
      let taber = document.getElementsByTagName("ion-tabbar")[0];
   taber.setAttribute('class','show-tabbar');
  }
  ionViewWillEnter(){
  //  this.loading = Loading.create({
  //          content: "Please wait...",
  //         //  duration: 300,
  //          dismissOnPageChange: true
            
  //       });
  // this.nav.present(this.loading);
  

  }
  // this.loading.dismiss(true);
    // let headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
    //  let ecnobToken = window.localStorage.getItem('ecnob.token');
    //   headers.append('Authorization', `Bearer ${ecnobToken}`)
    //     this.http.get(SERVER_NAME + 'events/detail',{headers:headers})
    //     .subscribe((data)=>{
    //         console.log('data recivng',data);
    //         console.log('dataJson',data.json());
    //          let dataJson = data.json().events;
    //         let para =  this.params.get('paramUser');
    //         console.log('getting params',para);
    //         for(var i = 0; i < dataJson.length; i++){
    //           if(dataJson[i].id === para){
    //             this.eventDetailArray = dataJson[i];
    //             this.myArray.push(this.eventDetailArray);
    //              console.log('array',this.myArray);
    //              this.loading.dismiss(true);
    //           }
    //         }
    //     },(err)=>{
    //        this.loading.dismiss(true);
    //   let alert = Alert.create({
    //   title: 'Error !',
    //   subTitle: 'Error in getting response Please Check if you have working internet connection and Valid Token.',
    //   buttons: ['OK']
    // });
    // this.nav.present(alert);
    //     console.log('error recing',err);
    //     console.log('err Josn',err.json());
    //     })
  
/**
 * 
 * back to page
 * 
 */

  pop(){
    this.nav.pop();
  }

/**
 * 
 * subscribe Events
 * 
 */
subscribe(id,select){
  console.log('id',id,'select',select);
  //  let loading = this.loading.create({
  //          content: "Please wait...",
  //         //  duration: 3000,
  //          dismissOnPageChange: true
            
  //       });
  //       loading.present();
   let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
    // var subscribtion = "status=" + select + "&event_id=" + id;
    let sub = {
      status: select,
      event_id: id
    }
    console.log('sub',sub);
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post( SERVER_NAME +'event/subscribe',sub,{headers:headers})
    .subscribe(
      (data)=>{
        // setTimeout(function() {
        //      loading.dismiss()
        //    }, 3000);
          //  clearTimeout(setTimeout)
          //  console.log('console log getting data',data);
          // this.nav.pop();
           let mydata = data.json();
          //  console.log('mydata',mydata);
           
           if(mydata.status){
             let toast = this.toast.create({
                message: "Event subscribe Successfully",
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
           }
           
           
      },(err)=>{
        // setTimeout(function() {
        //      loading.dismiss()
        //    }, 3000);
          // clearTimeout(timeout)
            //  this.nav.pop();
           console.log('gettitng error',err);
           let myerr = err.json();
           if(myerr.status_code== 500){
              let toast = this.toast.create({
                message: "Internal Server Error",
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
           }
              // let errorjson = err.json();
             if(myerr.status_code== 401){
                let toast = this.toast.create({
                message: "Session Expired",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
               window.localStorage.clear();
               this.menu.enable(false);
               this.nav.setRoot(SigninPage);
        }
           console.log('my Error',myerr);
      })
}

}
