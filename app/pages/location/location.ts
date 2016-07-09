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
    public myRadius;      ///Radius of the Map
    public kmConverter;   //to Convert Meters in Kilometer
    constructor(public data:DataService){
      setTimeout(()=>{
       
         this.map = null;
         this.initMap();
         this.data = data;
      },3000);   // Map will load after 3 seconds
        //  console.log('my radius',this.myRadius)
    }
     //=====================staring the map ============///
     initMap() {
        var myLatLng = {lat: DataService.dataArray[0].location.lat, lng: DataService.dataArray[0].location.long};

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 12,
          center: myLatLng
        });


        
        
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          draggable: true,

          title: 'Hello World!'
        });
        this.myRadius = 3;

         this.cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
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
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        
    var input = document.getElementById('pac-input');         
    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"]
    });          
    
    autocomplete.bindTo('bounds', map); 
    var infowindow = new google.maps.InfoWindow(); 
 
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  
        }
        
        moveMarker(place.name, place.geometry.location);
    });  
     $("input").focusin(function () {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                infowindow.close();
                var firstResult = $(".pac-container .pac-item:first").text();
                
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({"address":firstResult }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var lat = results[0].geometry.location.lat(),
                            lng = results[0].geometry.location.lng(),
                            placeName = results[0].address_components[0].long_name,
                            latlng = new google.maps.LatLng(lat, lng);
                        
                        moveMarker(placeName, latlng);
                        $("input").val(firstResult);
                    }
                });
            }
        });
    });
     
     function moveMarker(placeName, latlng){
        // marker.setIcon(image);
        marker.setPosition(latlng);
        infowindow.setContent(placeName);
        infowindow.open(map, marker);
     }

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
 


