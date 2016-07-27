import {Component} from '@angular/core';
import {NavController,Alert} from 'ionic-angular';
import {BroadcastEventPage} from '../broadcast-event/broadcast-event';
import {AllEventsPage} from '../all-events/all-events';
import {Page1} from '../page1/page1';
import {SigninPage} from '../signin/signin';
import {TabsPage} from '../tabs/tabs';


/*
  Generated class for the CreateListPeopleInvitePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create-list-people-invite/create-list-people-invite.html',
})
export class CreateListPeopleInvitePage {
  broadcastEvent = BroadcastEventPage;
  page1= AllEventsPage;
  eventsPage: AllEventsPage;
  public emailArray = [];
  public senderEmail: string;
  constructor(public nav: NavController) {
    
  }x  
  
  add(useremail){
    console.log('emai',useremail.value);
    console.log('model Email',this.senderEmail);
    this.emailArray.push(this.senderEmail);
    console.log('array',this.emailArray);
    useremail = '';
        this.senderEmail = '';
}
 delete(event){

  console.log('event',event);
       this.emailArray.splice(event, 1);

 }
 sendInvites(){
  let alert = Alert.create({
                      title: 'Sucess !',
                      subTitle: 'Invites Send..',
                      buttons: ['OK']
                });
                      this.nav.present(alert).then((succ)=>{
                       this.nav.push(TabsPage)
                      },(err)=>{
                            console.log('gettitng error');
                      })

}
}
