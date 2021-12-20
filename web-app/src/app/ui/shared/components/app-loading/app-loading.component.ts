import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  template:
    '<div *ngIf="isLoading" class="loading">' +
    '  <div class="loading__area">' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '  </div>' +
    '</div>' +
    '<ng-content></ng-content>',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent implements OnInit {
  @Input() isLoading: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
