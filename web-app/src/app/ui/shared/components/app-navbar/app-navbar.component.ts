import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  providers: [Location]
})
export class AppNavbarComponent {
  @Input() title: string = '';
  @Output() onButtonToggleClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  public toggle(): void {
    this.onButtonToggleClick.emit(true);
  }
}
