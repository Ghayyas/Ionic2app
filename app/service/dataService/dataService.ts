import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Platform} from "ionic-angular"
import {Geolocation} from 'ionic-native';
import {SignupPage} from "../../pages/signup/signup";

@Injectable()
export class DataService {
    
static dataArray : Array<usercreds> = new Array();
       
  constructor() {
   
  }
  static pushData(key){
      return new Promise(resolve=>{
        DataService.dataArray.push(key);
        if(DataService.dataArray[0] !==null){
            resolve(true)

            
        }
        else{
            resolve(false)
        }
      })
      
  }
static getData(){
    // return this.dataArray;
    console.log(DataService.dataArray[0]);
    return DataService.dataArray[0];
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
 Geolocation.getCurrentPosition().then((resp) => {
     this.latitude  = resp.coords.latitude;
    this.longitude =  resp.coords.longitude;
 console.log('cordova latitude',this.latitude)
 console.log('cordova longitude',this.longitude)
},(err)=>{
  if(err.code === 1){
    alert('we need to access your Location in order to access this app');
    // platform.exitApp()
    //return;
  }
  console.log('reciveing error ',err);
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