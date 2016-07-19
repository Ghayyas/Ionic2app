import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BroadcastEventPage} from '../broadcast-event/broadcast-event';

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
  public emailArray = [];
  public senderEmail: string;
  constructor(public nav: NavController) {
    
  }
  
  add(useremail){
    console.log('emai',useremail.value);
    console.log('model Email',this.senderEmail);
    this.emailArray.push(this.senderEmail);
    console.log('array',this.emailArray);
    useremail = '';
        this.senderEmail = '';
}
 delete(){
   for(var i = this.emailArray.length - 1; i >= 0; i--) {
    if(this.emailArray[i] === Number) {
       this.emailArray.splice(i, 1);
    }
}
 }

}
