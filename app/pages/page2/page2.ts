import {Component} from "@angular/core";
import {DealsDetailPage} from '../deals-detail/deals-detail';

@Component({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
dealDetailPage = DealsDetailPage;
  constructor() {

  }
}
