import {NavController,ToastController, Page, LoadingController,ActionSheetController,AlertController} from 'ionic-angular';
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
    constructor(public nav: NavController, private http:Http, public data: DataService, private alert: AlertController,
    private loading: LoadingController, private actionSheet: ActionSheetController, private toast:ToastController) {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.enableuserFields = false;

        this.formDisabled = false;
       
    }
//=============================//
  
// Image Upload promise

 uploadFile() {
  return new Promise((resolve)=>{
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
   options.mimeType = "image/jpeg";
console.log('options',options);

   var ft = new FileTransfer();

   ft.upload(array[0], uri, function onSuccess(r) {

      // console.log("Code = " + r.responseCode);
      // console.log("Response = " + r.response);
      let photoParse = JSON.parse(r.response);
      DataService.dataArray[0].photo = photoParse.image;
      // console.log("Sent = " + r.bytesSent);
      // window.alert('Image upload Success..');
   }, function onError(error) {
     let toast = this.toast.create({
            message: "Picture not Uploaded",
            duration: 2000,
            position: 'bottom'
          });

    toast.present();
      // alert("An error has occurred: Code = " + error.code);
      // console.log("upload error source " + error.source);
      // console.log("upload error target " + error.target);
   }, options);
  //  console.log('arra',array[0],"fileUrl",fileURL);
     }
     resolve(true);
  })
   
	
 
}

/**
 * Action sheet opening
 * 
 */


    //=====================================//
upload(){
  let actionSheet = this.actionSheet.create({
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
             
                    this.profilePic = array[0];
                console.log('image Data',this.profilePic);
        
            });
            
        }, error => {
        
           let toast = this.toast.create({
            message: "Something went wrong",
            duration: 2000,
            position: 'bottom'
          });

    toast.present();
            // console.log("ERROR -> " + JSON.stringify(error));
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
     
                    this.profilePic = array[0];
                console.log('image Data',this.profilePic);
    
            });
           
        }, error => {
   
      let toast = this.toast.create({
      message: "Something went wrong",
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
        });
          // console.log('Archive clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }
    ]
  });

  actionSheet.present();
  
  }


/**
 * 
 * Upload the Selected Image and navigates to next page
 * 
 */

  
  uploadSelectedImage(){
  let loading = this.loading.create({
		  content: "Please wait...",
		  duration: 6000,
		  // dismissOnPageChange: true
	  });
	  loading.present();
         
   this.uploadFile().then((suc)=>{
   console.log('image success',suc);

       this.nav.push(locationPage);
   },(err)=>{
     window.alert('Image not Uploaded');
     console.log('err on profile image upload ', err);
          this.nav.push(locationPage);

   })

   
 
        
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