import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass']
})
export class MediaComponent implements OnInit {
  fakecontent = [
    {'name': 'Kwesi Akil', 'text': 'Blah blah lorem blah blah ipsum blah blahsy blahsy blah blah'},
    {'name': 'Alva Akil', 'text': 'Blah blah lorem blah blah ipsum blah blahsy blahsy blah blah'},
    {'name': 'Najja Akil', 'text': 'Blah blah lorem blah blah ipsum blah blahsy blahsy blah blah'},
    {'name': 'Alva Khai Akil', 'text': 'Blah blah lorem blah blah ipsum blah blahsy blahsy blah blah'},
    {'name': 'Akhu Akil', 'text': 'Blah blah lorem blah blah ipsum blah blahsy blahsy blah blah'},

  ];

  constructor() { }

  ngOnInit() {
  }

}
