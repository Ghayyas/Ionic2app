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
      photo : '',  
      name : '',  //required
      type : '',  //required
      location : '', //required
      start_date : '',//required
      end_date : '', //required
     description : ''
    }
    
    
   zone: any; 
   public empty: any;
   public requiredFields: boolean;
   public loading: Loading;
   public nameField:boolean;
   public locationField: boolean;
   public typeField:boolean;
   public startDate:boolean;
   public endDateField:boolean;
   
   
   
   
   
   
    
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http) {
    this.http = http;
     
    this.typeField = false;
    this.requiredFields = false;
    this.nameField = false;
    this.locationField = false;
    this.startDate = false;
    this.endDateField = false
    
        let loading = Loading.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
       this.nav.present(loading); 
      this.empty = function(){
        this.parameters.photo = "";    
        this.parameters.name = '';  //required
        this.parameters.type = '';  //required
        this.parameters.location = ''; //required
        this.parameters.start_date = '';//required
        this.parameters.end_date = ''; //required
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
    this.loading = Loading.create({
           content: "Please wait...",
           dismissOnPageChange: true
            
        });
  this.nav.present(this.loading);
  // if(this.parameters.name || this.parameters.location || this.parameters.type || this.parameters.start_date || this.parameters.end_date == ''){
  //  this.requiredFields = true;
  //         // this.loading.dismiss();
  //  let alert = Alert.create({
  //     title: 'Validation failed !',
  //     subTitle: 'Please fill all required field',
  //     buttons: ['OK']
  //   });
  //      this.nav.present(alert);    
  // }
  if(this.parameters.type == ''){
    this.typeField = true;
       let alert = Alert.create({
      title: 'Validation failed !',
      subTitle: 'Please fill all required field',
      buttons: ['OK']
    });
       this.nav.present(alert); 
    // this.typeField  = false;
  }
  if(this.parameters.name == ''){
    this.nameField = true; 
       let alert = Alert.create({
      title: 'Validation failed !',
      subTitle: 'Please fill all required field',
      buttons: ['OK']
    });
       this.nav.present(alert);
      //  this.nameField = false; 
  }
  if(this.parameters.location == ''){
    this.locationField = true;
       let alert = Alert.create({
      title: 'Validation failed !',
      subTitle: 'Please fill all required field',
      buttons: ['OK']
    });
       this.nav.present(alert); 
      //  this.locationField = false;
  }

  if(this.parameters.start_date == ''){
    this.startDate = true;
    
       let alert = Alert.create({
      title: 'Validation failed !',
      subTitle: 'Please fill all required field',
      buttons: ['OK']
    });
       this.nav.present(alert); 
      //  this.startDate = false;
  }
  if(this.parameters.end_date == ''){
    this.endDateField = true;
    
       let alert = Alert.create({
      title: 'Validation failed !',
      subTitle: 'Please fill all required field',
      buttons: ['OK']
    });
       this.nav.present(alert); 
       
  }
  else{
       this.typeField = false;
    this.requiredFields = false;
    this.nameField = false;
    this.locationField = false;
    this.startDate = false;
    this.endDateField = false
  
  
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
                  // this.loading.dismiss();
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
    //   this.typeField = false;
    // this.requiredFields = false;
    // this.nameField = false;
    // this.locationField = false;
    // this.startDate = false;
    // this.endDateField = false
                // this.loading.dismiss();
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
}
