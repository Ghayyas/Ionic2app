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

declare var navigator: any;
declare var google:any;

@Component({
  templateUrl: 'build/pages/create-event/create-event.html',
    directives: [RADIO_GROUP_DIRECTIVES]

})

export class CreateEventPage {
 
    params = {
      photo : '',  
      name : '',  //required
      type : '0',  //required
      // location : '', //required
      start_date : '',//required
      end_date : '', //required
      description : '',
      // location: {
      latitude: '',
      longitude: '',
      // },

      created_at: new Date().getTime()
    }
    
    
   zone: any; 
   public empty: any;
  //  public requiredFields: boolean;
   public loading: Loading;
  //  public myLat: any;
  //  public myLong: any;
  //  public submit: any;
  //  public presentActionSheet:any;
  //  public nameField:boolean;
  //  public locationField: boolean;
  //  public typeField:boolean;
  //  public startDate:boolean;
  //  public endDateField:boolean;
   
      public myval;
  static myLat : any;
  static myLong : any;
   
   
   
   
    public cityCircle;
   createListPeopleToInvite = CreateListPeopleInvitePage;
  constructor(public nav: NavController, private http:Http) {
    this.http = http;
       

 
      //  this.ngOnInit();
    // this.typeField = false;
    // this.requiredFields = false;
    // this.nameField = false;
    // this.locationField = false;
    // this.startDate = false;
    // this.endDateField = false
    
        let loading = Loading.create({
           content: "Please wait...",
           duration: 3000,
           dismissOnPageChange: true
            
        });
       this.nav.present(loading);
    //    setTimeout(function() {
        //  this.initMap();
    //    }, 3000);
//  google.maps.event.addDomListener(window,'load',this.initMap());

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
       
        var input = new google.maps.places.SearchBox(document.getElementById('locationINput'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i];i++ ){
            console.log('place', place.geometry.location);
             
              //  let lat = place.geometry.location.lat();
               CreateEventPage.myLat = place.geometry.location.lat();
              // let long = place.geometry.location.lng();
              CreateEventPage.myLong = place.geometry.location.lng();
             console.log('lat',CreateEventPage.myLat,'long', CreateEventPage.myLong);
            }
            // this.presentActionSheet();
            // this.submit();
       
        })
     }




    //============ google map location api  complete============//






 presentActionSheet(){
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
                this.params.photo = "data:image/jpeg;base64," + imageData;
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
                this.params.photo = "data:image/jpeg;base64," + imageData;
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


submit(params)
  {
    this.params.latitude = CreateEventPage.myLat;
    this.params.longitude = CreateEventPage.myLong;
    // console.log('myval',params)
    // console.log('sub lat',CreateEventPage.myLat,'sub long', CreateEventPage.myLong);
  //  var id = <HTMLInputElement> document.getElementById('pac-input');
  //  console.log('pacINput',id.value);
  //   // console.dir(id);

  //   console.log('parameters',params);
  //   if(params.type == '1'){
  //   this.nav.rootNav.push(BroadcastEventPage);

  //   }
  //   else if(params.type == '0'){
  //   this.nav.rootNav.push(CreateListPeopleInvitePage);
  //   }
  
  console.log('params',params)
      // console.log('sub lat',CreateEventPage.myLat,'sub long', CreateEventPage.myLong);
    this.loading = Loading.create({
           content: "Please wait...",
           duration: 300,
           dismissOnPageChange: true
           
        });
  this.nav.present(this.loading);
 
  //   var headers = new Headers();
  //   var data  = this.params;
  //  headers.append('Content-Type', 'application/json');
  //  let ecnobToken = window.localStorage.getItem('ecnob.token');
  //  headers.append('Authorization', `Bearer ${ecnobToken}`)
  //   this.http.post(SERVER_NAME + 'events/create',data,{headers:headers})
  //   .subscribe(
  //     (data) => {
                  // this.loading.dismiss();
  
      //  console.log('data send',data.json()); 

       console.log('parameters',params);
    if(params.type == '1'){
    this.nav.rootNav.push(BroadcastEventPage);
                  // this.loading.dismiss();

    }
    else if(params.type == '0'){
    this.nav.rootNav.push(CreateListPeopleInvitePage);
                  // this.loading.dismiss();

    }

     
        //  this.empty();
    // },
    // (err) =>{
    //   console.log('parameters',params);

                // this.loading.dismiss();
    //  let alert = Alert.create({
    //   title: 'Error !',
    //   subTitle: 'Data has not been sent Please Reset All Fieds',
    //   buttons: ['OK']
    // });
    //    this.nav.present(alert);
    //   let str = JSON.parse(err._body);
    //   if(str.status_code == 422){
    //           let alert = Alert.create({
    //   title: 'Error !',
    //   subTitle: 'Please Fill all required Fields',
    //   buttons: ['OK']
    // });
    //    this.nav.present(alert);
      // }
    //    if(str.status_code == 401){
    //     let alert = Alert.create({
    //       title: "Error !",
    //       subTitle: "Your Token is Expire Please logout and signin again",
    //       buttons : ['OK']
    //     })
    //     this.nav.present(alert);
    //   }
    //   // this.empty();
      
    //   console.log('Error',err.json())
             
    // }
    // )

}
  }
// }
