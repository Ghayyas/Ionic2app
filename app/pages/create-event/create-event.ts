import {Component,OnInit} from "@angular/core";
import {NavController,Page,ActionSheet,Alert, Loading} from 'ionic-angular';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {Camera} from 'ionic-native';
import {NgZone} from "@angular/core";
import {BroadcastEventPage} from '../broadcast-event/broadcast-event';
import {CreateListPeopleInvitePage} from '../create-list-people-invite/create-list-people-invite';
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService'
// import {broadcastEvent} from ''

// import {RadioControlValueAccessor} from "./radio_value_accessor";

/*
  Generated class for the CreateEventPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


declare var google:any;
declare var navigator: any;
declare var FileUploadOptions:any;
declare var FileTransfer :any;




@Component({
  templateUrl: 'build/pages/create-event/create-event.html',
    directives: [RADIO_GROUP_DIRECTIVES]

})

export class CreateEventPage {
 
    params = {
      photo : '',  
      name : '',  //required
      type : '0',  //required
      location: '',
      start_date : '',//required
      end_date : '', //required
      description : '',

      latitude: '', //required
      longitude: '', //required


      created_at: new Date().getTime()
    }
    
    
   zone: any; 
   public empty: any;

   public loading: Loading;
  public fileUrl: any;
   
  public myval;
  static myLat : any;
  static myLong : any;
  static myImage:any; 
   
   
   
    public cityCircle;
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http) {
    this.http = http;
    
        let loading = Loading.create({
           content: "Please wait...",
           duration: 300,
           dismissOnPageChange: true
            
        });
       this.nav.present(loading);

      this.empty = function(){
        this.params.photo = "";    
        this.params.name = '';  //required
        this.params.type = '';  //required
        // this.params.location = ''; //required
        this.params.start_date = '';//required
        this.params.end_date = ''; //required
        this.params.description = '';
      }
  
        this.zone = new NgZone({enableLongStackTrace: false});
  }


   
    //============= google map location api =========//

   

     ngOnInit() {
      // this.myval = 'hello ghayyas'

        console.log('hello world');
       this.params.location = '';
        var input = new google.maps.places.SearchBox(document.getElementById('locationINput'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i];i++ ){
            console.log('place', place.geometry.location);
 
               CreateEventPage.myLat = place.geometry.location.lat();

              CreateEventPage.myLong = place.geometry.location.lng();
            //  console.log('lat',CreateEventPage.myLat,'long', CreateEventPage.myLong);
            }
   
       
        })
     }




    //============ google map location api  complete============//








//================== Cordova File to Be Send ===============//



uploadFile() {

   if(this.fileUrl  !== undefined){
      let loading = Loading.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
            
        });
       this.nav.present(loading);
    var fileURL =  this.fileUrl ;
   console.log('fileUrl',fileURL)
   var uri = encodeURI("http://lilanisoft.com/hotworks/api/index.php/uploadImage");
   var options = new FileUploadOptions();
	 var str =  this.fileUrl  ;
  let array = str.split("?")
     console.log(array[0])
   options.fileKey = "image";
   
      
   options.fileName =  array[0];  
   options.mimeType = "image/jpg";
console.log('options',options);

   var ft = new FileTransfer();

   ft.upload(array[0], uri, function onSuccess(r) {
      // console.log("Code = " + r.responseCode);
      // console.log("Response = " + r.response);
      let photoParse = JSON.parse(r.response);
      // alert('Image Caputured Successs');
       CreateEventPage.myImage  = photoParse.image;
        console.log('Create Event Page Image',CreateEventPage.myImage);
      // console.log("Sent = " + r.bytesSent);
      loading.dismiss(true)
   },  function onError(error) {
     loading.dismiss(true);
     let alert = Alert.create({
                      title: 'Error !',
                      subTitle: 'An error has occurred while sending picture to server',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
      // alert("An error has occurred while sending picture to server: Code = " + error.code);
      // console.log("upload error source " + error.source);
      // console.log("upload error target " + error.target);
   }, options);
   console.log('arra',array[0],"fileUrl",fileURL);
//    var suc = function onSuccess(r) {
//       console.log("Code = " + r.responseCode);
//       console.log("Response = " + r.response);
//       let photoParse = JSON.parse(r.response);
//       alert('Image Caputured Successs');
//        this.params.photo  = photoParse.image;
     
//       console.log("Sent = " + r.bytesSent);
//    }

//  var err =   function onError(error) {
//       alert("An error has occurred: Code = " + error.code);
//       console.log("upload error source " + error.source);
//       console.log("upload error target " + error.target);
//    }
	
 }
}






//================= Cordova END ===============//





//=============== Picture Taken ==============//

presentActionSheet():void {
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
                 this.fileUrl  =  imageData;
                var str =  this.fileUrl;
                  let array = str.split("?");
                   console.log('image Data', this.fileUrl);
                   this.uploadFile();
            });
            
        }, error => {
       
           let alert = Alert.create({
                      title: 'Error !',
                      subTitle: 'Something went wrong',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
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
                this.fileUrl =  imageData;
                var str =  this.fileUrl
                  let array = str.split("?")
                  console.log('image Data', this.fileUrl);
                    this.uploadFile();
        });
      
        }, error => {
      
           let alert = Alert.create({
                      title: 'Error !',
                      subTitle: 'Something went wrong',
                      buttons: ['OK']
                });
                      this.nav.present(alert);
        });
          // console.log('Archive clicked');
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


//============== Picture Taken END  =====================//





submit(params)
  {
    this.params.latitude = CreateEventPage.myLat;
    this.params.longitude = CreateEventPage.myLong;
    this.params.photo = CreateEventPage.myImage;

  
  console.log('params',params)
    this.loading = Loading.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
           
        });
  this.nav.present(this.loading);
 
    var headers = new Headers();
    var data  = this.params;
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'events/create',data,{headers:headers})
    .subscribe(
      (data) => {
          this.loading.dismiss(true);
    CreateEventPage.myImage = '';
    CreateEventPage.myLat = '';
    CreateEventPage.myLong = '';
       console.log('data send',data.json()); 

       console.log('parameters',params);
    if(params.type == '1'){
    this.nav.rootNav.push(BroadcastEventPage);
         this.loading.dismiss(true);

    }
    else if(params.type == '0'){
    this.nav.rootNav.push(CreateListPeopleInvitePage);
        this.loading.dismiss(true);

    }

     
         this.empty();
    },
    (err) =>{
      console.log('parameters',params);

                this.loading.dismiss(true);
     let alert = Alert.create({
      title: 'Error !',
      subTitle: 'Data has not been sent Please Reset All Fieds',
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
       if(str.status_code == 401){
        let alert = Alert.create({
          title: "Error !",
          subTitle: "Your Token is Expire Please logout and signin again",
          buttons : ['OK']
        })
        this.nav.present(alert);
      }
      // this.empty();
      
      console.log('Error',err.json())
             
    }
    )

}
  }

