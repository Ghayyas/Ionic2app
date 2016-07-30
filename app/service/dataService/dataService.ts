import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Platform, Alert, NavController} from "ionic-angular"
import {Geolocation} from 'ionic-native';
import {SignupPage} from "../../pages/signup/signup";




export let SERVER_NAME = 'http://ecnobapi.herokuapp.com/api/';

@Injectable()
export class DataService {

static success:boolean;
static dataArray : Array<usercreds> = new Array();
static code;
       
  constructor() {
  }
  
  static tabsData: boolean;
   
  
  
  static pushData(key){
      return new Promise(resolve=>{
        DataService.dataArray.push(key);
        // console.log('data Service',DataService.dataArray[0]);
        setTimeout(function() {
        if(DataService.dataArray[0].latitude == null){
            // window.alert('Could Not fetch your Location.. try again');
            resolve(false);


            // alert('code'+ this.code);
            
   }
        else{
            resolve(true);
        }
        }, 6000);
    
      })
      
  }
static getData(){
    // return this.dataArray;
    console.log(DataService.tabsData);
    // return DataService.dataArray[0];
}
  
}

export class usercreds{
    public email:string;
    public password: string;
    public name:string;
    public type: string;
    public photo:string;
    // public location: any;
    public longitude:number;
    public latitude: number;
    public  radius:number;
    // public nav: NavController

    constructor(email1:string,
     password1: string,
     name1:string,
     type1: string,
     photo1:string,
    //  platform: Platform,
    longitude:number,
    latitude:number,
    radius:number
    
    // location:any
    ){
       
        // this.longitude = SignupPage.long;
        // this.latitude = SignupPage.lat;
 Geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:5000,maximumAge:3000}).then((resp) => {
     this.latitude  = resp.coords.latitude;
     this.longitude =  resp.coords.longitude;
     console.log('cordova latitude',this.latitude)
    console.log('cordova longitude',this.longitude)
    DataService.success = true;
},(err)=>{
  if(err.code === 1){

  DataService.success = false;;
    // window.alert('we need to access your Location in order to access this app');
    // platform.exitApp()
    //return;
  }
  else{
    //   window.alert('Could not fetch you location please check your Internet connection and try again');
  }
  console.log('reciveing error ',err);
  DataService.code = err.code;
})
       this.email = email1;
       this.password = password1;
       this.name = name1;
       this.type = type1;
       this.photo = photo1;
       this.longitude = longitude;
       this.latitude = latitude;
       this.radius= radius;
       
    }
}