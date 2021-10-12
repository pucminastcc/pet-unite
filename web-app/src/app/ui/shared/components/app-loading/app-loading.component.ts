import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div *ngIf="isLoading" class="loading">\n' +
    '  <div class="loading__area">' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '    <div class="loading__box"></div>' +
    '  </div>' +
    '</div>' +
    '<div *ngIf="!isLoading" class="content">' +
    '     <ng-content></ng-content>' +
    '</div>',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent implements OnInit {
  @Input() isLoading: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
