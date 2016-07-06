import {NavController, Page, Loading,ActionSheet,Alert} from 'ionic-angular';
import {Camera,Transfer,File} from 'ionic-native';
import {NgZone, Component} from "@angular/core";
import {Http, Headers } from '@angular/http';
import {DataService} from '../../service/dataService/dataService';

declare var google:any;
declare var load:any;    

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
          zoom: 8,
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
          
  //         map.addListener('center_changed', function() {
  //   // 3 seconds after the center of the map has changed, pan back to the
  //   // marker.
  //       window.setTimeout(function() {
  //     map.panTo(marker.getPosition());
  //   }, 3000);
  // });

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
  

      }
      
      //====================== END =========================//
      
      
      //=====================Range Values Update  ====================//
      
    updateCircleRadius = function(val) {
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
 


