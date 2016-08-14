import {Component} from '@angular/core';
import {NavController, Platform, App, AlertController, LoadingController ,MenuController, ToastController} from 'ionic-angular';
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

export interface inter {
     id: any;
  }


@Component({
  templateUrl: 'build/pages/all-events/all-events.html',
   pipes: [limit]
})


export class AllEventsPage {
  eventDetailPage = EventDetailsPage;
  event: [Object];
  arr:[Object];
  public events: [Object];
  public load: any;
  public error: boolean;
  public definedError: boolean;
  public type:any;
  alleventformscreen = AllEventFormPage;
  createEvent = CreateEventPage;
  public pet: string;
  public allEventsArray = [];
  public selectedYes: boolean;
  public selectedNo: boolean;
  public selectedMaybe: boolean;
  public myarray = [];
  public myLocalArray = [];
  public noPublicData: boolean;
  public ios:boolean;
  public android:boolean;

  // ============== Constructor =============//


  constructor(public nav: NavController, public http:Http, public menu: MenuController,public loading: LoadingController, private alertCtrl:AlertController,
  private toast: ToastController, public plaform:Platform) {

    this.pet = 'public';
    this.http = http;
    this.type = '1';
    this.error = false;
    this.definedError = false;
    this.selectedYes = false;
    this.selectedNo = false;
    this.selectedMaybe = false;
  
    //  if(this.plaform.is('ios')){
    //       // this.ios = true;
    //  }
     if(this.plaform.is('android')){
          // this.android = true;
          let content = document.getElementsByTagName('ion-content')[0];
          content.classList.add('background-hide');
     }
  
    //  this.event = [{name:'admin',title: 'Events Title', end_date: '20-15-17',location: 'Buhadurabad Karachi Pakistan',type: 0,id:0},
    //  {name:'Ghayyas',title: 'Events Title', end_date: '20-15-17',location: 'Buhadurabad Karachi Pakistan',type: 0, id:1},
    //  {name:'admin12',title: 'Events Title', end_date: '20-15-17',location: 'Buhadurabad Karachi Pakistan',type: 0, id:2}]
    
   



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
  
  // createEventgo(){
  //   this.nav.RootNav.push(CreateEventPage)
  // }
  
  

ionViewDidEnter(){
  //     let load = this.loading.create({
  //          content: "Please wait...",
  //         //  duration: 300, 
  //          dismissOnPageChange: true
            
  //       });
  //  load.present();
    let toast = this.toast.create({
      message: "Fetching New Results Please wait...",
      // duration: 5000,
      position: 'bottom'
       });
       toast.present();
  
    let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.get( SERVER_NAME +'event/list',{headers:headers})
    .subscribe(
      (data)=>{
        // console.log('data',data);
        setTimeout(function() {
          toast.dismiss();
        }, 3000);
      //  load.dismiss();

       this.event = data.json().events;
        if(this.event == undefined){
    let toast = this.toast.create({
      message: "Sorry no new Events Avalible",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();

    //    let alert = this.alertCtrl.create({
    //       title: 'Sorry',
    //       subTitle: 'No New Events Avalible!',
    //       buttons: ['OK']
    //  });
    //    alert.present();
      //  load.dismiss(true);
        //  this.definedError = true;         //IF DATA FROM SERVER IS UNDEFINED

        }
        else if(this.event.length == 0){
     let toast = this.toast.create({
      message: "Sorry no new Events Avalible",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
    //     let alert = this.alertCtrl.create({
    //       title: 'Sorry',
    //       subTitle: 'No New Events Avalible!',
    //       buttons: ['OK']
    //  });
    //    alert.present();
      //  load.dismiss(true);
          // this.definedError = true;
        }
        this.allEventsArray.push(this.event);
        console.log('events Array',this.allEventsArray);
        console.log('data',this.event);
      // load.dismiss(true);
     

      },
      (err)=>{
    // console.log('err',err);
     setTimeout(function() {
          toast.dismiss();
        }, 3000);
        if(err){
     let toast = this.toast.create({
      message: "Needs Internet Connection",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
       }
    // load.dismiss(true);
    //     let alert = this.alertCtrl.create({
    //       title: 'Error !',
    //       subTitle: 'Make Sure you are connected to internet',
    //       buttons: ['OK']
    //  });
    //   alert.present();
      // load.dismiss(true);
        // if (err){
         
        //   // this.error = true;
      
        // }
        console.log('err',err);
        let str = JSON.parse(err._body);
       
      // str = str.replace(/\\/g, '')
             
     if(str.status_code == 500){
        
      let toast = this.toast.create({
      message: "Internal Server error",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
  
      }
      // let expire = 401
      // str.status_code
      if(str.status_code == 401){
                let toast = this.toast.create({
                message: "Session Expired",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
               window.localStorage.clear();
               this.menu.close();
               this.menu.enable(false);
               this.nav.setRoot(SigninPage);
        }
      }
    )     


}
  
 myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }



    // selectedBtn(i,selected){
  
    //   console.log('array',this.myLocalArray);
    //   let id;

   

    
    // if (selected == 'yes'){
    //     this.selectedYes = true;
    //     this.selectedNo = false;
    //     this.selectedMaybe = false;
    //  }
    //  if(selected == 'no'){
    //    this.selectedNo = true;
    //    this.selectedMaybe = false;
    //    this.selectedYes =false;
    //  }
    //  if(selected == 'maybe'){
    //    this.selectedMaybe = true;
    //    this.selectedNo = false;
    //     this.selectedYes =false;
    //  }
    //  console.log('my btn',selected,i);
    // }

subscribe(id,select){
  console.log('id',id,'select',select);
   let loading = this.loading.create({
           content: "Please wait...",
          //  duration: 3000,
           dismissOnPageChange: true
            
        });
        loading.present();
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
        setTimeout(function() {
             loading.dismiss()
           }, 3000);
          //  clearTimeout(setTimeout)
          //  console.log('console log getting data',data);
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
        setTimeout(function() {
             loading.dismiss()
           }, 3000);
          // clearTimeout(timeout)
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


  newTabs(i){
    console.log('getting array',this.allEventsArray);
    
      let loading = this.loading.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
        loading.present();
  
    console.log('index',i);
    this.nav.push(EventDetailsPage,{ paramUser: this.allEventsArray, paramID: i});    
    loading.dismiss(true);  
}
    ionViewWillLeave(){
      this.allEventsArray = [];
      console.log('events array',this.allEventsArray);
}

    // console.log('params',this.parameters);
    
}

  