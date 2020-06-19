import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent {
  showmessage: boolean = false;
  message: string;

  constructor() { }

  sutenClicked() {
    this.showmessage = true;
    this.message = 'Stay tuned.. #BUIDL';
  }

}
