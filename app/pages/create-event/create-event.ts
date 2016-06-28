import {Component} from "@angular/core";
import {NavController,Page,ActionSheet,Alert, Loading} from 'ionic-angular';
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
      photo : ''
    }
    zone: any; 
   public empty: any;
    
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http) {
    this.http = http;
    
    
        let loading = Loading.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
       this.nav.present(loading); 
      this.empty = function(){
        this.parameters.photo = "";
        this.parameters.name = '';
        this.parameters.type = '';
        this.parameters.location = '';
        this.parameters.start_date = '';
        this.parameters.end_date = '';
        this.parameters.description = '';
      }
  
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
            quality : 45,
            destinationType : navigator.camera.DestinationType.DATA_URL,
            sourceType : navigator.camera.PictureSourceType.CAMERA,
            // allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                this.parameters.photo = "data:image/jpeg;base64," + imageData;
                let alert = Alert.create({
                      title: 'Succeed !',
                      subTitle: 'Image has been captured',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
            });
        }, error => {

           let alert = Alert.create({
                      title: 'Error !',
                      subTitle: 'Something went wrong',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
            console.log("ERROR -> " + JSON.stringify(error));
        });
        }
      },
      {
        text: 'Upload from Gallery',
        handler: () => {
          Camera.getPicture({
            quality : 45,
            destinationType : navigator.camera.DestinationType.DATA_URL,    //File URI only for Android  to use for IOS type NATIVE_URI	instead of FILE_URI
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            // allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                this.parameters.photo = "data:image/jpeg;base64," + imageData;
                  let alert = Alert.create({
                      title: 'Succeed !',
                      subTitle: 'Image has been captured',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
            });
        }, error => {
           let alert = Alert.create({
                      title: 'Error !',
                      subTitle: 'Something went wrong',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
        });
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


  submit(parameters){
    let loading = Loading.create({
           content: "Please wait...",
           dismissOnPageChange: true
            
        });
  this.nav.present(loading);
    //   let alert = Alert.create({
    //   title: 'Succeed !',
    //   subTitle: 'Data has been sent',
    //   buttons: ['OK']
    // });
    //    this.nav.present(alert);
    // console.log('params',this.parameters);
    var headers = new Headers();
    var data  = this.parameters;
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post('http://nameless-scrubland-35696.herokuapp.com/api/events/create',data,{headers:headers})
    .subscribe(
      (data) => {
              let alert = Alert.create({
      title: 'Succeed !',
      subTitle: 'Data has been sent',
      buttons: ['OK']
    });
       this.nav.present(alert);
       console.log('data send',data.json()); 
         this.empty();
    },
    (err) =>{
     let alert = Alert.create({
      title: 'Error !',
      subTitle: 'Data has not been sent',
      buttons: ['OK']
    });
       this.nav.present(alert);
      let str = JSON.parse(err._body);
      if(str.status_code == 422){
              let alert = Alert.create({
      title: 'Error !',
      subTitle: 'Please Fill all required Fields',
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
      this.empty();
      
      console.log('Error',err.json())
             
    }
    )

}
}
