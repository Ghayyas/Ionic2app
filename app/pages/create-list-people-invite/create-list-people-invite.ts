import {Component} from '@angular/core';
// import {Keyboard} from 'ionic-native';
import {NavController,AlertController,MenuController,LoadingController,ToastController,Keyboard} from 'ionic-angular';
// import {BroadcastEventPage} from '../broadcast-event/broadcast-event';
import {AllEventsPage} from '../all-events/all-events';
import {Page1} from '../page1/page1';
import {SigninPage} from '../signin/signin';
import {TabsPage} from '../tabs/tabs';
import {CreateEventPage} from '../create-event/create-event';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';

/*
  Generated class for the CreateListPeopleInvitePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-list-people-invite/create-list-people-invite.html',
})
export class CreateListPeopleInvitePage {
  page1= AllEventsPage;
  eventsPage: AllEventsPage;
  public emailArray = [];
  public whenClick :boolean;
  public senderEmail: string;
  constructor(public nav: NavController, private http:Http, public keyboard:Keyboard,
 private loading:LoadingController, private alert: AlertController, private toast: ToastController
 ,private menu:MenuController) {
      console.log('from list event',CreateEventPage.arraytoSend);

  }

  keyboardClose(){
    this.keyboard.close();
  }
  
  add(useremail){
    console.log('emai',useremail.value);

    this.emailArray.push({"email": useremail.value});
    console.log('array',this.emailArray);
    useremail = '';
    this.senderEmail = '';
    this.whenClick = true;

}
 delete(event){

  console.log('event',event);
       this.emailArray.splice(event, 1);

 }


   showToast(message: string) {
    let toast = this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
   }


 sendInvites(){

  console.log("send Invites Works");
   
   let jsonEmail = JSON.stringify(this.emailArray);
   console.log('log',jsonEmail);
  
  CreateEventPage.arraytoSend[0]['origins'] = null;
  CreateEventPage.arraytoSend[0]['emails'] = jsonEmail; //push('email',jsonS);
  console.log('getting array',CreateEventPage.arraytoSend[0]);

let loading = this.loading.create({
           content: "Please wait...",
          //  duration: 3000,
           dismissOnPageChange: true
           
        });
  loading.present();
  var headers = new Headers();
  var data  = CreateEventPage.arraytoSend[0];
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'event/create',data,{headers:headers})
    .subscribe(
      (data) => {
        setTimeout(function() {
          loading.dismiss(true);
        }, 3000);
   

             CreateEventPage.arraytoSend = [];
        
        this.showToast('Success !');
        console.log('data send',data.json()); 
        this.nav.setRoot(TabsPage);
        // this.nav.push(TabsPage);
         },(err)=>{
        setTimeout(function() {
          loading.dismiss(true);
        }, 3000);
         CreateEventPage.arraytoSend = [];
        // this.nav.push(TabsPage);
         console.log('err',err);
         let error = err.json();
         if(error.status_code== 401){
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
         console.log('getting error',error);
          this.showToast('Data not Send to server !');
          let str = JSON.parse(err._body);
         if(str.status_code == 422){
          this.showToast('Some Fileds Missing Please resubmit!');
          }
         
      })

// this.nav.push(TabsPage)
//  }
}
  ionViewWillLeave(){
      CreateEventPage.arraytoSend = [];
  }
}
