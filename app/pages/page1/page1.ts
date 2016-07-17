import {Component} from "@angular/core";
import {MenuController}from 'ionic-angular'


@Component({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  
  public pet: string;
  
  constructor(public menu:MenuController) {
  this.pet = 'public';
   menu.enable(true);
  }
  
  myclick(param){
     this.pet = param;
     console.log('params',this.pet);
   }
  
}
