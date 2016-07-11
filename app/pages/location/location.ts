import {NavController, Page, Loading,ActionSheet,Alert} from 'ionic-angular';
import {Camera,Transfer,File} from 'ionic-native';
import {NgZone, Component, EventEmitter} from "@angular/core";
import {Http, Headers } from '@angular/http';
import {DataService} from '../../service/dataService/dataService';

declare var google:any;
declare var load:any;    
declare var $:any;

 @Page({
  templateUrl: 'build/pages/location/location.html',
  providers: [DataService]
})

export class locationPage{
    public map:any;

    public cityCircle;   //Circle Map
    public Radius;      ///Radius of the Map
    public kmConverter;   //to Convert Meters in Kilometer
    constructor(public data:DataService){
      setTimeout(()=>{
       
         this.map = null;
         this.initMap();
         this.data = data;
         this.Radius = 3;
      },3000);   // Map will load after 3 seconds
        //  console.log('my radius',this.myRadius)
    }
     //=====================staring the map ============///
     initMap() {
        var myLatLng = {lat: DataService.dataArray[0].location.lat, lng: DataService.dataArray[0].location.long};

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
           strokeColor: 'white',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'white',
            fillOpacity: 4.35,
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
    DataService.dataArray[0].location.lat = drage_lat;
    DataService.dataArray[0].location.long = drage_long;
    console.log("postion latitude",drage_lat);
    console.log('position long',drage_long);
  });
  this.cityCircle.bindTo('center', marker, 'position');
  
        // Create the search box and link it to the UI element.
        // var input = document.getElementById('pac-input');
        // var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
              var input = new google.maps.places.SearchBox(document.getElementById('pac-input'));

        google.maps.event.addListener(input,'places_changed',function(){
            console.log("search",input.getPlaces());
            var places = input.getPlaces();
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for( i = 0; place=places[i];i++ ){
                console.log('place', place.geometry.location);
                bounds.extend(place.geometry.location);
                marker.setPosition(place.geometry.location);
                map.setCenter(place.geometry.location);
            }
            map.fitBounds(bounds);
            map.setZoom(12);
         // var places = input.getPlaces();
        })
        // Bias the SearchBox results towards current map's viewport.
        // map.addListener('bounds_changed', function() {
        //   searchBox.setBounds(map.getBounds());
        // });
        
    
      }
      
      //====================== END =========================//
      
      
      
      
      
      
      
      //=====================Range Values Update  ====================//
      
    updateCircleRadius = function(val) {
         console.log('value',val);
      
                 this.kmConverter = Number(val) * 1000;
             
               this.cityCircle.setRadius(this.kmConverter);
               
                 DataService.dataArray[0].location.radius = val   //push the values in array

                  console.log('city bounds',val);
          }
         //======================end =========================//
         
         
         
         
         
         
         
      
      //==============Update Profile Function ==================//
      updateProfile(){
      DataService.getData();   // all data array;
       }
			//=========================end=========================//
          
    
  }
 


