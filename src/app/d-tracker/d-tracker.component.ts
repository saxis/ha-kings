import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-d-tracker',
  templateUrl: './d-tracker.component.html',
  styleUrls: ['./d-tracker.component.sass']
})
export class DTrackerComponent {
  currmonth = 'Feb';
  constructor(public auth: AuthService) { }

}
