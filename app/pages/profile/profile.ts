
import {NavController, Page, Loading,ActionSheet,Alert} from 'ionic-angular';
import {Camera,Transfer} from 'ionic-native';
import {NgZone, Component} from "@angular/core";
import {Http, Headers } from '@angular/http';
import {DataService} from '../../service/dataService/dataService';
declare var navigator: any;

 @Page({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [DataService]
})


/**
 * Profile class
 */
export class profile {
  zone:any
  fileURL: string;
  uri:string;
  trustAllHosts:boolean;
    constructor(public nav: NavController, private http:Http, public data: DataService) {
        this.zone = new NgZone({enableLongStackTrace: false});
    this.fileURL =  DataService.dataArray[0].photo;
   this.uri = encodeURI("http://lilanisoft.com/hotworks/api/index.php/uploadImage");
  //  this.options =  options;
   this.trustAllHosts = true
    }
  usercreds = {
      photo: ''
    }
  public ft:Transfer;
//=============================//

 uploadFile() {




	
  //  options.fileKey = "image.jpg";
  //  options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
  //  options.mimeType = "img/jgp";

  //  var headers = {'headerParam':'headerValue'};
  //  options.headers = headers;

  //  var ft = Transfer;

    this.ft.upload(this.fileURL,this.uri,this.trustAllHosts)

   function onSuccess(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
   }

   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
	
}




    //=====================================//
upload():void {
  let actionSheet = ActionSheet.create({
    title: 'Select from Camera',
    buttons: [
      {
        text: 'Take Picture form Camera',
        role: 'destructive',
        handler: () => {
          Camera.getPicture({
            quality : 45,
            destinationType : navigator.camera.DestinationType.FILE_URI,
            sourceType : navigator.camera.PictureSourceType.CAMERA,
            // allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                DataService.dataArray[0].photo = imageData;
                let alert = Alert.create({
                      title: 'Succeed !',
                      subTitle: 'Image has been captured',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
                      this.uploadFile();
            });
        }, error => {
              DataService.dataArray[0].photo = ''
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
            destinationType : navigator.camera.DestinationType.FILE_URI,    //File URI only for Android  to use for IOS type NATIVE_URI	instead of FILE_URI
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            // allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                DataService.dataArray[0].photo  =  imageData;
                  let alert = Alert.create({
                      title: 'Succeed !',
                      subTitle: 'Image has been captured',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
                      this.uploadFile()
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
  uploadSelectedImage(){
    // this.data.pushData(this.usercreds);
    // DataService.pushData(this.usercreds);
    console.log('data clicked');
   
    DataService.getData();
    
  
  
  }
}