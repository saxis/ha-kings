import { Component, Inject } from '@angular/core';
import { WINDOW } from '../core/services/window.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  locked;

  constructor(@Inject(WINDOW) private window: Window) {
    console.log(window);
  }

  checkout(ev) {
    console.log('in the checkout method ', ev.detail);
    console.log('the ev object ', ev);
    const locked = localStorage.getItem('__unlockProtocol.locked');
    const account = localStorage.getItem('__unlockProtocol.accountAddress');
    console.log('locked: ', locked);
    console.log('account address: ', account);
    if (window) {
      //window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
    }
  }
}
