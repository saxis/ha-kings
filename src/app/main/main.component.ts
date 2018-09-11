import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
user;

  constructor(private as: AuthService) {
    this.as.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
  }

}
