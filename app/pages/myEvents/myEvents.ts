import {Component,NgZone} from '@angular/core';
import {NavController,ToastController, NavParams,LoadingController,AlertController,MenuController} from 'ionic-angular';
// import { DataService } from '../../service/dataService/dataService';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {Page1} from '../page1/page1';
import {CreateDealPage} from '../create-deal/create-deal';
import {Page3} from '../page3/page3';
import {AllCompaniesPage} from '../all-companies/all-companies';
import {AllEventsPage} from '../all-events/all-events';
import {DealsPage} from '../deals/deals';
import {CreateEventPage}from '../create-event/create-event';
import {TabsPage} from '../tabs/tabs';
import {limit} from '../limit';
import {SigninPage} from '../signin/signin';
import {ChangeDetectorRef} from '@angular/core';
import {EditEvent} from '../editEvent/editEvent';


@Component({
  templateUrl: 'build/pages/myEvents/myEvents.html',
  pipes: [limit]
})
export class myEvents{
  tab1: any = Page1;
  tab2: any = DealsPage;  //deals Page
  tab3: any = AllEventsPage;
  tab4: any = AllCompaniesPage;
  editEvent:any = EditEvent
  myImg: [Object];
  response:any;
  innerWidth: number;
  public width;
  public height;
  private remaining : number;
  public wid;
  public person;
  public nexsusP: boolean;
  public totalAttendents: number;
    constructor(public menu: MenuController,public nav: NavController,ngZone:NgZone,public http: Http,
    private loading: LoadingController, private alert: AlertController,private toast:ToastController){
      this.nexsusP = false; 
     this.myImg = [
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
      {img: './img/default-user.png'},
      {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
        {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
       {img: './img/default-user.png'},
      {img: './img/default-user.png'},
    ];
    
    //  ngZone.run(() => {
    //         this.width = window.innerWidth;
            
    //         this.height = window.innerHeight;
    //     });        
    // window.onresize = (e) =>
    // {
        ngZone.run(() => {
            this.width = window.innerWidth;
            
            this.height = window.innerHeight;
        });

     
        console.log('width',this.width,'Height',this.height);
        
        
    // };



    //  this.getTotal();


    }
    
    ionViewWillEnter(){
  //   let loading = this.loading.create({
  //          content: "Please wait...",
  //         //  duration: 3000,
  //          dismissOnPageChange: true
            
  //       });
  // loading.present();
    let toast = this.toast.create({
                message: "Please wailt..",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
   let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let ecnobToken = window.localStorage.getItem('ecnob.token');
      headers.append('Authorization', `Bearer ${ecnobToken}`)
        this.http.get(SERVER_NAME + 'event/myevent',{headers:headers})
        .subscribe((data)=>{
          // setTimeout(function() {
          //   loading.dismiss();
          // }, 3000);
          if(data.json().length == 0){
            let toast = this.toast.create({
                message: "No Result Found..",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
          }
          
           this.response = data.json().events;
           
            console.log('data recivng',data);
            console.log('dataJson',data.json());
          
           
            
        },(err)=>{
          //   setTimeout(function() {
          //   loading.dismiss();
          // }, 3000);
        // console.log('error recing',err);
           let toast = this.toast.create({
                message: "No Internet Connection",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
        console.log('err Josn',err.json());
        let errorjson = err.json();
        if(errorjson.status_code== 401){
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
        })
        
        
      if(this.width <= 320){
       this.totalAttendents = 5;
     }
      else if(this.width <= 339){
       this.totalAttendents = 5;
     }
      else if(this.width <= 350){
       this.totalAttendents = 6;
     }
      
      else if(this.width <= 360){
       this.totalAttendents = 6;
     }
     else if(this.width <= 366){
       this.totalAttendents = 6;
     }
      
    else  if(this.width <= 375){
       this.totalAttendents = 6;
     }
     else  if(this.width <= 390){
       this.totalAttendents = 6;
     }
      else  if(this.width <= 400){
       this.totalAttendents = 6;
     }
    else if(this.width <= 411){
       this.totalAttendents = 7;
     }
      else if(this.width <= 414){
       this.totalAttendents = 7;
     }
       else if(this.width <= 415){
       this.totalAttendents = 7;
     }
     else if(this.width <= 435){
       this.totalAttendents = 7;
       this.nexsusP = true;
     }
       else if(this.width <= 439){
       this.totalAttendents = 7;
       this.nexsusP = true;
     }
      else if(this.width <= 460){
       this.totalAttendents = 9;
     }
     else if(this.width <= 480){
       this.totalAttendents = 9;
     }
     else if(this.width <= 600){
       this.totalAttendents = 9;
     }
     else if(this.width <= 640){
       this.totalAttendents = 13;
     }
     else if(this.width <= 639){
       this.totalAttendents = 13;
     }
     else if(this.width <= 720){
       this.totalAttendents = 12;
     }
     else if(this.width <= 768){
       this.totalAttendents = 14;
     }
     else if(this.width <= 800){
       this.totalAttendents = 16;
     }
     else if(this.width <= 801){
       this.totalAttendents = 16;
     }
       else if(this.width <= 856){
       this.totalAttendents = 16;
     }
    else {
       this.totalAttendents = 6;
     }
      // this.person = this.totalAttendents;
      if(this.myImg.length <= 6){
        this.remaining = 0;
      }
   else {
      this.remaining = this.myImg.length - this.totalAttendents;
      console.log('length',this.remaining);
   }
   
    }
deleteEvent(id){
     let loading = this.loading.create({
           content: "Please wait...",
          //  duration: 3000,
           dismissOnPageChange: true
            
        });
   let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let ecnobToken = window.localStorage.getItem('ecnob.token');
     let deleteID = {
          event_id : id
     }
     console.log('delelting ID',id);
      headers.append('Authorization', `Bearer ${ecnobToken}`)
        this.http.post(SERVER_NAME + 'event/delete',deleteID,{headers:headers})
        .subscribe((data)=>{
          setTimeout(function() {
            loading.dismiss();
          }, 1000);
           
           let mydata = data.json();
            console.log('data recivng',data);
            console.log('dataJson',data.json());
             if(mydata.status){
              //  this.response.remove(id);
             let toast = this.toast.create({
                message: "Event Delete Successfully",
                duration: 3000,
                position: 'bottom'
                });
                toast.present();

   //============ Getting Fresh Array From Server  ===============//


//  let loading = this.loading.create({
//            content: "Please wait...",
//           //  duration: 3000,
//            dismissOnPageChange: true
            
//         });
  loading.present();
   let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let ecnobToken = window.localStorage.getItem('ecnob.token');
      headers.append('Authorization', `Bearer ${ecnobToken}`)
        this.http.get(SERVER_NAME + 'event/myevent',{headers:headers})
        .subscribe((data)=>{
          // setTimeout(function() {
          //   loading.dismiss(true);
          // }, 1000);
          
           this.response = data.json().events;
            console.log('data recivng',data);
            console.log('dataJson',data.json());
          
           
            
        },(err)=>{
          //   setTimeout(function() {
          //   loading.dismiss(true);
          // }, 1000);
        // console.log('error recing',err);
        console.log('err Josn',err.json());
        let errorjson = err.json();
        if(errorjson.status_code== 401){
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
        })


 //============ Ending Fresh Array From Server  ===============//
           }
           
            
        },(err)=>{
            setTimeout(function() {
            loading.dismiss();
          }, 1000);
        console.log('error reciving',err);
        console.log('err Json',err.json());
        let errorjson = err.json();
      if(errorjson.status_code== 500){
              let toast = this.toast.create({
                message: "Internal Server Error",
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
        }
          else if(errorjson.status_code== 401){
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
})
}

  edit(i){
    console.log('getting data',i);
    this.nav.push(EditEvent,{obj:i}).then((suc)=>{
       console.log('Success',suc);
    },(err)=>{
      console.log('error',err);
      
    });
  }

    toogle(){
      console.log('toogle clicked');
      this.menu.toggle();
    }
    createEvent(){
        // this.nav.setRoot(TabsPage).then((data)=>{
         this.nav.push(CreateEventPage);
        // },(err)=>{
        //   console.log('getting error');
        // })
         
   
       
    }
}