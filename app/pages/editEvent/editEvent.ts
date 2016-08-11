import {Component,OnInit} from '@angular/core';
import {NavController,NavParams, ToastController,LoadingController, ActionSheetController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {NgZone} from "@angular/core";
// import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
declare var google:any;
declare var navigator: any;
declare var FileUploadOptions:any;
declare var FileTransfer :any;
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';

@Component({
  templateUrl: 'build/pages/editEvent/editEvent.html'
    // directives: [RADIO_GROUP_DIRECTIVES]

})




export class EditEvent implements OnInit {
  public gettingParams = [];
  static lati:any;
  static longi:any;
  zone:any;
  public fileUrl;
  static myImage;
  public date:any;
  public event: Object;

  constructor(private nav: NavController,private navParams: NavParams, private toast: ToastController, private load: LoadingController,
  private actionSheet: ActionSheetController, private http:Http){
     
         let getObject = this.navParams.get('obj');
          this.gettingParams.push(getObject) ;
          
         console.log('arr',this.gettingParams);
    this.event = {
      photo : this.gettingParams[0].photo,  
      name : this.gettingParams[0].name,  //required
      start_date : this.gettingParams[0].start_date,//required
      end_date : this.gettingParams[0].end_date, //required
      description : this.gettingParams[0].description,
      latitude: '', //required
      longitude: '', //required
      // created_at: new Date()
     }
  
    console.log('nav params',getObject);
      this.zone = new NgZone({enableLongStackTrace: false});
     
     

  // this.initilize();
   
      //   setTimeout(function() {
     


      //  var input = new google.maps.places.SearchBox(document.getElementById('loc'));

      //   google.maps.event.addListener(input,'places_changed',function(){
      //       console.log("search",input.getPlaces());
      //       var places = input.getPlaces();
      //       var bounds = new google.maps.LatLngBounds();
      //       var i, place;
      //       for( i = 0; place=places[i];i++ ){
      //       console.log('place', place.geometry.location);
 
      //          EditEvent.lati = place.geometry.location.lat();

      //         EditEvent.longi = place.geometry.location.lng();
      //        console.log('lat',EditEvent.lati ,'long', EditEvent.longi);
      //       }
   
       
      //   })
      //   }, 3000);



  }




 ngOnInit() {
   console.log('1 break');
   
   var input =  new google.maps.places.SearchBox(document.getElementById('autocomplete'));
          console.log('2 break');
        input.addListener('places_changed',function(){
             console.log('3 break');
            console.log("search",input.getPlaces());
               console.log('4 break');
            var places = input.getPlaces();
               console.log('5 break');
            var bounds = new google.maps.LatLngBounds();
               console.log('6 break');
            var i, place;
               console.log('7 break');
            for( i = 0; place=places[i];i++ ){
                 console.log('8 break');
            console.log('place', place.geometry.location);
             console.log('9 break');
               EditEvent.lati = place.geometry.location.lat();
                   console.log('10 break');
              EditEvent.longi = place.geometry.location.lng();
                 console.log('11 break');
             console.log('lat',EditEvent.lati ,'long', EditEvent.longi);
                console.log('12 break');
            }
})
 }



//========File Upload ==========//

uploadFile() {

   if(this.fileUrl  !== undefined){
      let loading = this.load.create({
           content: "Please wait...",
          //  duration: 300,
           dismissOnPageChange: true
            
        });
       loading.present(loading);
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
        setTimeout(function() {
            loading.dismiss(true);
          }, 3000);
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      let photoParse = JSON.parse(r.response);
      // alert('Image Caputured Successs');
       EditEvent.myImage  = photoParse.image;
        console.log('Create Event Page Image',EditEvent.myImage);
      // console.log("Sent = " + r.bytesSent);
      
   },  function onError(error) {
        setTimeout(function() {
            loading.dismiss(true);
          }, 3000);
       let toast = this.toast.create({
      message: "Getting Error While sending picture to server",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
      console.log("An error has occurred while sending picture to server: Code = " + error);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }, options);
   console.log('arra',array[0],"fileUrl",fileURL);

	
 }
}



//===========File UPload END ==========//



 presentActionSheet():void {
  let actionSheet = this.actionSheet.create({
    title: 'Select from Camera',
    cssClass: 'action-sheets-basic-page',

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
            this.uploadFile();
            });
            
        }, error => {
       
     let toast = this.toast.create({
      message: "Something went wrong",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
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
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.zone.run(() => {
                this.fileUrl =  imageData;
                 this.uploadFile();
            });
      
        }, error => {
      
    let toast = this.toast.create({
      message: "Something Went Wrong",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
        });
         
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

  actionSheet.present();
 }
 submit(event,eventID){
  //      this.loading = Loading.create({
  //          content: "Please wait...",
  //          duration: 300,
  //          dismissOnPageChange: true
           
  //       });
  // this.nav.present(this.loading);
 
    var headers = new Headers();
    var datatoSend  = event;
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'event/update/'+ eventID,datatoSend,{headers:headers})
    .subscribe(
      (data) => {
          // this.loading.dismiss(true);

       console.log('data send',data.json()); 

       console.log('parameters',event);
     console.log('event',event,"eventID",eventID);
 },(err)=>{
      console.log('getting error',err);
 })
 }

}
