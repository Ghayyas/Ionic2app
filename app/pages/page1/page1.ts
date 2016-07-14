import {Component} from "@angular/core";
import {MenuController}from 'ionic-angular'


@Component({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor(public menu:MenuController) {
   menu.enable(true);
  }
}
