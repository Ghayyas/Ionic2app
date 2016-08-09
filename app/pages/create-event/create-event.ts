import {Component,OnInit} from "@angular/core";
import {NavController,Platform,Page,ActionSheetController,AlertController, LoadingController, Keyboard,ToastController} from 'ionic-angular';
import {DealsPage} from '../deals/deals';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {Camera} from 'ionic-native';
import {NgZone} from "@angular/core";
import {BroadcastPage} from '../broadcast-event/broadcast-event';
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

export class CreateEventPage{
 
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
      created_at: new Date()
    }
    
    
   zone: any; 
   public empty: any;

  //  public loading: Loading;
  public fileUrl: any;
   
  public myval;
  static myLat : any;
  static myLong : any;
  static myImage:any; 
  static arraytoSend = [];
   public platform: Platform
    // public actionsheetCtrl: ActionSheetController
  // static start_date:any;
  // static end_date:any;
  // static description:any;
  // static name:any;
  // static created_at:any;
  // static type1:number;
  public cityCircle;


   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http, private keyboard: Keyboard, private load :LoadingController, 
  private alert: AlertController, public actionSheet: ActionSheetController, private toast:ToastController) {
    this.http = http;
    this.keyboard = keyboard;
        this.params.photo = "";    
        this.params.name = '';  //required
        // this.params.type = '';  //required
        this.params.location = ''; //required
        this.params.start_date = '';//required
        this.params.end_date = ''; //required
        this.params.description = '';
     
            
        let loading = this.load.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
       loading.present();

      this.empty = function(){
        this.params.photo = "";    
        this.params.name = '';  //required
        // this.params.type = '';  //required
        this.params.location = ''; //required
        this.params.start_date = '';//required
        this.params.end_date = ''; //required
        this.params.description = '';
      }
  
        this.zone = new NgZone({enableLongStackTrace: false});
            window.addEventListener('native.keyboardshow', ()=>{
         let keyboardHide = document.getElementsByTagName('ion-tabs')[0];
       keyboardHide.classList.add('keyboardHide');
         console.log('from app ts keyboard is showing..');
       });


        window.addEventListener('native.keyboardhide', ()=>{
     let keyboardHide = document.getElementsByTagName('ion-tabs')[0];
       keyboardHide.classList.remove('keyboardHide');
           console.log('from app ts keyboard is hiding');
        })
  }


   
    //============= google map location api =========//

   

     ngOnInit() {
    

        // console.log('hello world');
      //  this.params.location = '';
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



keyboardClose(){
  this.keyboard.close();
}




//================== Cordova File to Be Send ===============//



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
       CreateEventPage.myImage  = photoParse.image;
        console.log('Create Event Page Image',CreateEventPage.myImage);
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






//================= Cordova END ===============//





//=============== Picture Taken ==============//

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
  //  let actionSheet = this.actionSheet.create({
  //     title: 'Albums',
  //     cssClass: 'action-sheets-basic-page',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         role: 'destructive',

  //         handler: () => {
  //           console.log('Delete clicked');
  //         }
  //       },
  //       {
  //         text: 'Share',

  //         handler: () => {
  //           console.log('Share clicked');
  //         }
  //       },
  //       {
  //         text: 'Play',
        
  //         handler: () => {
  //           console.log('Play clicked');
  //         }
  //       },
  //       {
  //         text: 'Favorite',
    
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel', // will always sort to be on the bottom
      
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present()
  
  }


//============== Picture Taken END  =====================//


   //Static Values Must be Empty After data send.. 



//=========================  Submit Funtion ================//
submit(params)
  {
    console.log('params1',this.params,'submit parms2',params);   
    this.params.latitude = CreateEventPage.myLat;
    this.params.longitude = CreateEventPage.myLong;
    this.params.photo = CreateEventPage.myImage;
    this.params.name = params.name;
    this.params.created_at = params.created_at;
    this.params.description = params.description;
    this.params.start_date = params.start_date;
    this.params.end_date = params.end_date;
    this.params.type = params.type;
     
      // console.log('params',this.params.type,'submit parms',params.type);    

   if(this.params.photo == undefined ){
     let toast = this.toast.create({
      message: "Picture is Required try again",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
}
  else if(this.params.latitude == undefined){
      let toast = this.toast.create({
      message: "Unable to get your location try again",
      duration: 3000,
      position: 'bottom'
       });
       toast.present();
  }
  else{
 
  //   this.loading = Loading.create({
  //          content: "Please wait...",
  //          duration: 300,
  //          dismissOnPageChange: true
           
  //       });
  // this.nav.present(this.loading);
 
  //   var headers = new Headers();
  //   var data  = this.params;
  //  headers.append('Content-Type', 'application/json');
  //  let ecnobToken = window.localStorage.getItem('ecnob.token');
  //  headers.append('Authorization', `Bearer ${ecnobToken}`)
  //   this.http.post(SERVER_NAME + 'event/create',data,{headers:headers})
  //   .subscribe(
  //     (data) => {
  //         this.loading.dismiss(true);

  //      console.log('data send',data.json()); 

  //      console.log('parameters',params);
   if(params.type == '0'){
     this.nav.push(CreateListPeopleInvitePage);
     CreateEventPage.arraytoSend.push(this.params);
      console.log('from create events param type 2',CreateEventPage.arraytoSend);


        // this.loading.dismiss(true);

    }

  else if(params.type == '1'){
    console.log('working else');
    this.nav.push(BroadcastPage);
// BEvent
    CreateEventPage.arraytoSend.push(this.params);
    console.log('from create events param type 1',CreateEventPage.arraytoSend);
    
        //  this.loading.dismiss(true);

    }
    
     
        //  this.empty();
    // // },
    // // (err) =>{
    // //   console.log('parameters',params);

    // //             this.loading.dismiss(true);
    // //  let alert = Alert.create({
    // //   title: 'Error !',
    // //   subTitle: 'Data has not been sent Please Reset All Fieds',
    // //   buttons: ['OK']
    // // });
    // //    this.nav.present(alert);
    // //   let str = JSON.parse(err._body);
    // //   if(str.status_code == 422){
    // //           let alert = Alert.create({
    // //   title: 'Error !',
    // //   subTitle: 'Make sure you have filled all required Fields',
    // //   buttons: ['OK']
    // // });
    // //    this.nav.present(alert);
    // //   }
    // //    if(str.status_code == 401){
    // //     let alert = Alert.create({
    // //       title: "Error !",
    // //       subTitle: "Your Token is Expire Please logout and signin again",
    // //       buttons : ['OK']
    // //     })
    // //     this.nav.present(alert);
    // //   }
    // //   // this.empty();
      
    // //   console.log('Error',err.json())
             
    // // }
    // )

// }
  }
  }
  //========================= SUBMIT FUNCTION END ================//
  }

