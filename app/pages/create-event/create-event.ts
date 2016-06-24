import {Component} from "@angular/core";
import {NavController,Page,ActionSheet} from 'ionic-angular';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {Camera} from 'ionic-native';
import {NgZone} from "@angular/core";

import {CreateListPeopleInvitePage} from '../create-list-people-invite/create-list-people-invite';
import {Http, Headers } from '@angular/http';

// import {RadioControlValueAccessor} from "./radio_value_accessor";

/*
  Generated class for the CreateEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var navigator: any;


@Component({
  templateUrl: 'build/pages/create-event/create-event.html',
    directives: [RADIO_GROUP_DIRECTIVES]

})

export class CreateEventPage {
    
    parameters = {
      photo : ""
    }
    // base64Image: string;
    zone: any;
    
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http) {
    this.http = http;
    // this.image = "https://placehold.it/150x150";
        this.zone = new NgZone({enableLongStackTrace: false});
  }
  presentActionSheet() {
  let actionSheet = ActionSheet.create({
    title: 'Select from Camera',
    buttons: [
      {
        text: 'Take Picture form Camera',
        role: 'destructive',
        handler: () => {
          Camera.getPicture({
            quality : 75,
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                this.parameters.photo = "data:image/jpeg;base64," + imageData;
            });
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
          // console.log('Destructive clicked');
        }
      },
      {
        text: 'Upload from Gallery',
        handler: () => {
          console.log('Archive clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  this.nav.present(actionSheet);
  }

  takePicture() {
        
    }

  submit(parameters){
    // console.log('params',this.parameters);
    var headers = new Headers();
    var data  = this.parameters;
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/events/create',data,{headers:headers})
    .subscribe(
      (data) => {
      console.log('reciveing data',data);
    },
    (err) =>{
      let str = JSON.parse(err._body);
      // str = str.replace(/\\/g, '')
      if(str.status_code == 422){
        console.log('Please Fill all Required Fields');
      }
      console.log('status code',str.status_code)
      console.log('error reciveing', str.message);
    }
    )

}
}
