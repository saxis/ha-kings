import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { includes } from './common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  _show: boolean;
  username: string;
  password: string;
  errorMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log('in onSubmit method ', f);
  }


}
