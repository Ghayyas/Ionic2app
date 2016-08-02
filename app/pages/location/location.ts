import {NavController, Page, Loading,ActionSheet,Alert,Toast} from 'ionic-angular';
import {Camera,Transfer,File} from 'ionic-native';
import {NgZone, Component, EventEmitter, OnInit} from "@angular/core";
import {Http, Headers } from '@angular/http';
import {DataService, SERVER_NAME} from '../../service/dataService/dataService';
import {TabsPage} from '../tabs/tabs';
import 'rxjs/add/operator/catch';
import {MyApp} from '../../app';


// import {Server_Name} from '../../service/data'

// import {AuthService}from "../../service/auth/authservice";

declare var google:any;
declare var load:any;    
// declare var $:any;










 @Page({
  templateUrl: 'build/pages/location/location.html',
  providers: [DataService]
})

export class locationPage{
    public map:any;
    // public authservice;


    public cityCircle;   //Circle Map
    public Radius;      ///Radius of the Map
    public kmConverter;   //to Convert Meters in Kilometer
    public myLati;
    public mylongi;
    constructor(public data:DataService,public http:Http, public nav: NavController){
       
//   this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA0mplZyMtSAN7mZtQuqu_yncvQt526eMc&libraries=places",
//   function(){
//       console.log('google-loader has been loaded, but not the maps-API ');
//     });
        //    this.callgoogleMap();

       this.myLati = DataService.dataArray[0].latitude;
       this.mylongi = DataService.dataArray[0].longitude;
    //    DataService.mapService();
    //   this.callgoogleMap();
      setTimeout(()=>{
         this.map = null;
         this.nav = nav;
         this.initMap();
         this.data = data;
         this.http = http;
         this.Radius = 3;
      },6000);   
      // Map will load after 3 seconds
        //  console.log('my radius',this.myRadius)
    }



//=========== Loading Script ==============//


//     loadScript(src,callback){
  
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     if(callback)script.onload=callback;
//     document.getElementsByTagName("head")[0].appendChild(script);
//     script.src = src;
 
//   }

// public urlFetchApp:any;

//  callgoogleMap() {
//   try {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     document.getElementsByTagName("head")[0].appendChild(script);
//     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0mplZyMtSAN7mZtQuqu_yncvQt526eMc&libraries=places';
//   } catch (err) {
//       alert('Map could not be loaded..');
//       console.log('Need working Internet Connection',err);
//       // handle the error here
//   }
// }
  




//=============== END ================//


     //=====================staring the map ============///
     initMap() {


         let conLat = Number(this.myLati);
         let conlog = Number(this.mylongi);
         let lati = typeof(conLat);
         let logi = typeof(conlog);
         console.log('lati',lati,'logi',logi,'conlat',conLat,'conlog',conlog);
        var myLatLng = {lat: this.myLati, lng: this.mylongi};
       console.log('latitude',this.myLati,'longitude',this.mylongi);
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 12,
          center: myLatLng,
          styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
          
        });
        // var input = new google.maps.places.input(document.getElementById('pac-input'));

        // google.maps.event.addListener(input,'places_changed',function(){
        //     console.log("search",input.getPlaces());
        //  // var places = input.getPlaces();
        // })
    //    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    //     var autocomplete = new google.maps.places.Autocomplete(input);
    //     autocomplete.bindTo('bounds', map);

 
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: 'img/ic_marker.png',
          draggable: true,

          title: 'Hello World!'
        });
        

         this.cityCircle = new google.maps.Circle({
           strokeColor: '#2f74f5',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'white',
            fillOpacity: 0.1,
            draggable: true,
             map: map,
             editable: false,
            center: myLatLng,
            radius: 3000
          });
        

  marker.addListener('dragstart', function() {
   
    map.setCenter(marker.getPosition());
    var drage_lat = marker.getPosition().lat();
    var drage_long = marker.getPosition().lng();
    DataService.dataArray[0].latitude = drage_lat;
    DataService.dataArray[0].longitude = drage_long;
    // console.log("postion latitude",drage_lat);
    // console.log('position long',drage_long);
  });
  this.cityCircle.bindTo('center', marker, 'position');

 var input = new google.maps.places.SearchBox(document.getElementById('pac-input'));

        google.maps.event.addListener(input,'places_changed',function(){
            // console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i];i++ ){
                // console.log('place', place.geometry.location);
                bounds.extend(place.geometry.location);
                marker.setPosition(place.geometry.location);
                map.setCenter(place.geometry.location);
            }
            map.fitBounds(bounds);
            map.setZoom(12);
        })
        
    
      }
      
      //====================== END =========================//
      
      
      
      
      
      
      
      //=====================Range Values Update  ====================//
      
    updateCircleRadius = function(val) {
         console.log('value',val);
      
                 this.kmConverter = Number(val) * 1000;
             
               this.cityCircle.setRadius(this.kmConverter);
               
                 DataService.dataArray[0].radius = val   //push the values in array

                //   console.log('city bounds',val);
          }
         //======================end =========================//
         
         
         
         //================== TOAST ============//



   
  



         //==================END====================//
         
         
         
      
      //==============Update Profile Function ==================//
      updateProfile(){
          let loading = Loading.create({
		  content: "Please wait...",
        //   duration: 3000,
		dismissOnPageChange: true
	  });
	  this.nav.present(loading);
 
                          
         var creds =  "email=" + DataService.dataArray[0].email + "&name="+DataService.dataArray[0].name 
         + "&password=" +DataService.dataArray[0].password + "&longitude="+DataService.dataArray[0].longitude
         + "&latitude=" +DataService.dataArray[0].latitude + "&radius=" +DataService.dataArray[0].radius
         + "&photo=" +DataService.dataArray[0].photo + "&type="+DataService.dataArray[0].type

            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post(SERVER_NAME + 'auth/signup', creds, { headers: headers })
            .subscribe(data => {
             console.log('data',data.json());
            loading.dismiss(true);
              if (data.json().token){
                window.localStorage.setItem('ecnob.token',data.json().token);
                window.localStorage.setItem('type',data.json().type);
                this.nav.setRoot(TabsPage);
              }
             
              },(err)=>{
                   loading.dismiss(true);
         let alert = Alert.create({
               title: 'Error !',
               subTitle: 'Make sure You have Working internet connection and GeoLocation is enable',
               buttons: ['OK']
           });
       this.nav.present(alert);
         if(err.json().status == 422){
             let alert = Alert.create({
               title: 'Error !',
               subTitle: 'Email Already Taken',
               buttons: ['OK']
           });
       this.nav.present(alert);
         }
              console.log('err',err);
            });
        
        
        
        
   
                          
       }
			//=========================end=========================//
          
    
  }
 


