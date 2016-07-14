
import {NavController, Page, Loading,ActionSheet,Alert} from 'ionic-angular';
import {Camera,Transfer,File} from 'ionic-native';
import {NgZone, Component} from "@angular/core";
import {Http, Headers } from '@angular/http';
import {DataService} from '../../service/dataService/dataService';
import {locationPage} from "../location/location";
import {SigninPage} from '../signin/signin';


declare var navigator: any;
declare var FileUploadOptions:any;
declare var FileTransfer :any;


 @Page({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [DataService]
})

/**
 * Profile class
 */
export class profile {
  zone:any
  fileURL:string;
  uri:string;
  public email;
  public userName;
  locationPage:locationPage
  trustAllHosts:boolean;
 FileUrlAddress: string;
 public enableuserFields: boolean;
 public formDisabled:boolean;
 public profilePic:any
    constructor(public nav: NavController, private http:Http, public data: DataService) {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.enableuserFields = false;
        // this.email = '';
        this.formDisabled = false;
       
       

        // this.userName = '';
        // this.email = DataService.dataArray[0].email;
        // this.userName = DataService.dataArray[0].name;
        // console.log('userFileds',this.enableuserFields);
        // DataService.dataArray[0].email = this.email;
        // DataService.dataArray[0].name = this.userName
       
    }
  // usercreds = {
  //     photo: ''
  //   }
  // public ft:Transfer;
//=============================//

 uploadFile() {

   if(this.FileUrlAddress !== undefined){
    var fileURL = this.FileUrlAddress;
   console.log('fileUrl',fileURL)
   var uri = encodeURI("http://lilanisoft.com/hotworks/api/index.php/uploadImage");
   var options = new FileUploadOptions();
	 var str = this.FileUrlAddress;
  let array = str.split("?")
     console.log(array[0])
   options.fileKey = "image";
   
      
   options.fileName =  array[0];  
   options.mimeType = "image/jpg";
console.log('options',options);

   var ft = new FileTransfer();

   ft.upload(array[0], uri, suc, err, options);
   console.log('arra',array[0],"fileUrl",fileURL);
   var suc = function onSuccess(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      let photoParse = JSON.parse(r.response);
      DataService.dataArray[0].photo = photoParse.image;
     
      console.log("Sent = " + r.bytesSent);
   }

 var err =   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
	
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
                this.FileUrlAddress  =  imageData;
                var str = this.FileUrlAddress;
                  let array = str.split("?")
                    //  console.log(array[0])
                    this.profilePic = array[0];
                console.log('image Data',this.profilePic);
                // let alert = Alert.create({
                //       title: 'Succeed !',
                //       subTitle: 'Image has been captured',
                //       buttons: ['OK']
                // });
                //       this.nav.present(alert);
            });
            
        }, error => {
              // this.FileUrlAddress  = null
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
            sourceType : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
            // allowEdit : true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                this.FileUrlAddress  =  imageData;
                var str = this.FileUrlAddress;
                  let array = str.split("?")
                    //  console.log(array[0])
                    this.profilePic = array[0];
                console.log('image Data',this.profilePic);
            //       let alert = Alert.create({
            //           title: 'Succeed !',
            //           subTitle: 'Image has been captured',
            //           buttons: ['OK']
            //     });
            //           this.nav.present(alert);
            });
            // this.FileUrlAddress = null;
        }, error => {
          // this.FileUrlAddress = null;
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
    // if(val1 && val2 === true){
        // DataService.dataArray[0].email = this.email;
        // DataService.dataArray[0].name = this.userName;
        
    // console.log('val',val1,val2);
    this.uploadFile()
   let loading = Loading.create({
		  content: "Please wait...",
		  duration: 3000,
		  // dismissOnPageChange: true
	  });
	  this.nav.present(loading);
          this.nav.push(locationPage);  
          console.log('works!');
    // }
    // else{
      // let alert = Alert.create({
      //                 title: 'Validation Falied!',
      //                 subTitle: 'Please Validate form and try again',
      //                 buttons: ['OK']
      //           });
      //                 this.nav.present(alert);
    // }
    // setTimeout(function() {
    // console.log(DataService.dataArray[0].location);
    // this.FileUrlAddress = null;

    // },4000)
    
    
  
  }
  
  // enableFileds(){
  //   this.enableuserFields = true;
  //   console.log('now user filed',this.enableuserFields);
  // }
}