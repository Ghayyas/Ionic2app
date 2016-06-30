import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SignupPage} from "../../pages/signup/signup";

@Injectable()
export class DataService {
    
static dataArray : Array<usercreds> = new Array();
       
  constructor() {
  }
  static pushData(key){
      return new Promise(resolve=>{
        DataService.dataArray.push(key);
        if(DataService.dataArray !== null){
            resolve(true)
        }
        else{
            resolve(false)
        }
      })
      
  }
static getData(){
    // return this.dataArray;
    console.log(DataService.dataArray);
}
  
}
export class usercreds{
    public email:string;
    public password: string;
    public name:string;
    public type: string;
    public photo:string;

    constructor(email1:string,
     password1: string,
     name1:string,
     type1: string,
     photo1:string){
       this.email = email1;
       this.password = password1;
       this.name = name1;
       this.type = type1;
       this.photo = photo1;
    }
}