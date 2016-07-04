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
    
    constructor(public data:DataService){
      setTimeout(()=>{
       
         this.map = null;
         this.initMap();
         this.data = data;
      },3000);
         
    }
     initMap() {
        var myLatLng = {lat: DataService.dataArray[0].location.lat, lng: DataService.dataArray[0].location.long};

        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 6,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          draggable: true,

          title: 'Hello World!'
        });
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            draggable: true,
             map: map,
            center: myLatLng,
            radius: 100000
          });
      }

 
    // this.map = new google.maps.Map(document.querySelector("#map_canvas"), mapOptions);
    //  var x = document.querySelector('#map_canvas');
    //   console.log(x);
  }
 


// }