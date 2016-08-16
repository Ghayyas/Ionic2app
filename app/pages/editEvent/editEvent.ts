import {Component,OnInit,ViewChild} from '@angular/core';
import {NavController,NavParams,Content,ToastController,LoadingController, MenuController, ActionSheetController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {NgZone} from "@angular/core";
// import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
declare var google:any;
declare var navigator: any;
declare var FileUploadOptions:any;
declare var FileTransfer :any;
import {Http, Headers } from '@angular/http';
import {SERVER_NAME} from '../../service/dataService/dataService';
import {myEvents} from '../myEvents/myEvents';
import {SigninPage} from '../signin/signin';

@Component({
  templateUrl: 'build/pages/editEvent/editEvent.html'
    // directives: [RADIO_GROUP_DIRECTIVES]

})




export class EditEvent {

  @ViewChild(Content)
    content:Content;

    onPageScroll(event) {
        console.log("page scrolling",event.target.scrollTop);
    }

    /**
     * 
     * on scrolling hide the suggession div
     * 
     */

    ngAfterViewInit() {

        this.content.addScrollListener((event)=>{
         document.getElementById('autocomplete').blur();
          var timer = -1;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.pac-container { visibility: hidden; }';
            document.getElementsByTagName('head')[0].appendChild(style);
            document.getElementById('contain').className = 'pac-container';
            
               if(timer !== -1) {
                  clearTimeout(timer);        
              }
              timer = setTimeout(function() {
                    // do something
           var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.pac-container { visibility: visible;}';
            document.getElementsByTagName('head')[0].appendChild(style);
             document.getElementById('contain').className = 'pac-container';
           }, 150);
       
        });
    }


  public gettingParams = [];
  static lati:any;
  static longi:any;
  zone:any;
  public fileUrl;
  static myImage;
  public date:any;
  public event: any;
  public name;
  public location;
  public description;
  public photo;
  static latitude;
  static longitude;
  public start_date;
  public end_date;

  constructor(private nav: NavController,private navParams: NavParams, private toast: ToastController, private load: LoadingController,
  private actionSheet: ActionSheetController, private http:Http, private menu: MenuController){
     
         let getObject = this.navParams.get('obj');
          this.gettingParams.push(getObject) ;
          this.name = this.gettingParams[0].name;
          this.location = this.gettingParams[0].location;
          this.description = this.gettingParams[0].description
          this.photo = this.gettingParams[0].photo;
          this.start_date = this.gettingParams[0].start_date;
          this.end_date = this.gettingParams[0].end_date;
          EditEvent.latitude = this.gettingParams[0].latitude;
          EditEvent.longitude = this.gettingParams[0].longitude;
          EditEvent.myImage = this.gettingParams[0].photo;
         console.log('latitude',EditEvent.latitude);
         
         
    this.event = {
      type: this.gettingParams[0].type,
      photo : this.gettingParams[0].photo,  
      name : this.gettingParams[0].name,  //required
      start_date : this.gettingParams[0].start_date,//required
      end_date : this.gettingParams[0].end_date, //required
      description : this.gettingParams[0].description,
      latitude:  this.gettingParams[0].latitude, //required
      longitude: this.gettingParams[0].longitude, //required
      id: this.gettingParams[0].id
      // created_at: new Date()
     }
  
    console.log('nav params',getObject);
      this.zone = new NgZone({enableLongStackTrace: false});
     


  }


/**]
 * 
 * google map search box initilize
 * 
 */

ngOnInit() {
    
        var input = new google.maps.places.SearchBox(document.getElementById('autocomplete'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            // var bounds = new google.maps.LatLngBounds();
            var i, place;
            
            for( i = 0; place=places[i];i++ ){
            console.log('place', place.geometry.location);
 
               EditEvent.latitude = place.geometry.location.lat();

              EditEvent.longitude = place.geometry.location.lng();
            //  console.log('lat',EditEvent.lati,'long', EditEvent.longi);
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
      // console.log("Code = " + r.responseCode);
      // console.log("Response = " + r.response);
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
      // console.log("An error has occurred while sending picture to server: Code = " + error);
      // console.log("upload error source " + error.source);
      // console.log("upload error target " + error.target);
   }, options);
  //  console.log('arra',array[0],"fileUrl",fileURL);

	
 }
}



//===========File UPload END ==========//


/**
 * 
 * action sheet
 * 
 */


 presentActionSheet():void {
  let actionSheet = this.actionSheet.create({
    title: 'Select from Camera',
    cssClass: 'action-sheets-basic-page',
    enableBackdropDismiss: true,

    buttons: [
      {
        text: 'Take Picture form Camera',
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

/**
 * 
 * Update the Event
 * 
 */


 submit(event){
  //      let loading = this.load.create({
  //          content: "Please wait...",
  //          duration: 3000,
  //          dismissOnPageChange: true
           
  //       });
  // loading.present();
  console.log("HEloo",EditEvent.latitude);
  //  if(this.event.latitude == undefined || this.event.latitude == ''){
       this.event.latitude =  EditEvent.latitude//this.gettingParams[0].latitude, //required
       this.event.longitude = EditEvent.longitude//this.gettingParams[0].longitude

   // }
   // else{
  //  this.event.latitude = EditEvent.lati;
   // this.event.longitude = EditEvent.longi;
    //}
    // if(this.event.photo == undefined|| this.event.photo == ''){
      this.event.photo = EditEvent.myImage
   
    // }
    // else{
    //    this.event.photo = EditEvent.myImage;
    // }

     console.log('This Event',this.event, "Event",event,"event ID",event.id);
     
    var headers = new Headers();
    var datatoSend  = this.event;
   headers.append('Content-Type', 'application/json');
   let ecnobToken = window.localStorage.getItem('ecnob.token');
   headers.append('Authorization', `Bearer ${ecnobToken}`)
    this.http.post(SERVER_NAME + 'event/update/'+ event.id,datatoSend,{headers:headers})
    .subscribe(
      (data) => {
          // setTimeout(function() {
          // loading.dismiss(true);  
          // }, 5000);
          
      let toast = this.toast.create({
      message: "Event Successfully Updated..",
      duration: 3000,
      position: 'bottom'
      });
       toast.present();
       

      //  console.log('data send',data.json()); 
     
      this.nav.pop().then((s)=>{
       EditEvent.latitude = '';
       EditEvent.longitude = '';
       EditEvent.myImage = '';
      });
      //  console.log('parameters',event);
      //  console.log('event',event,"eventID",event.id);
       
     },(err)=>{
          //  setTimeout(function() {
          // loading.dismiss(true);  
          // }, 5000);
       let error = err.json();
       EditEvent.lati = '';
       EditEvent.longi = '';
       EditEvent.myImage = '';
      // console.log('getting error',err);
     let toast = this.toast.create({
      message: "Something Went Wrong..",
      duration: 3000,
      position: 'bottom'
      });
       toast.present();
         if(error.status_code== 500){
              let toast = this.toast.create({
                message: "Internal Server Error",
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
        }
          else if(error.status_code== 401){
                let toast = this.toast.create({
                message: "Session Expired",
                duration: 3000,
                position: 'bottom'
                });
                toast.present()
               window.localStorage.clear();
               this.menu.close();
               this.menu.enable(false);
               this.nav.setRoot(SigninPage);
        }

 })
 }

}
