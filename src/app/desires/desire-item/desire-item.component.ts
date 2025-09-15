// src/app/desires/desire-item/desire-item.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Desire {
  id?: number;
  name: string;
  detail?: string;
  year?: number;
  amount: number;
  fulfilled: boolean;
  donated?: boolean;
  recipient?: string;
  owner?: string;
}

@Component({
  selector: 'app-desire-item',
  templateUrl: './desire-item.component.html',
  styleUrls: ['./desire-item.component.sass']
})
export class DesireItemComponent implements OnInit {
  item$!: Observable<Desire | undefined>;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      switchMap(params => this.http.get<Desire>(`/api/desires/${params.get('id')}`))
    );
  }
}
