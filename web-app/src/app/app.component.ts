import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private primengConfig: PrimeNGConfig
  ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    if (environment.production)
      this.disableBrowserDeveloperTools();
  }

  private disableBrowserDeveloperTools(): void {
    window.document.onkeydown = (e: KeyboardEvent) => !((e.keyCode === 123)
      || (e.ctrlKey && e.keyCode === 85)
      || (e.ctrlKey && e.shiftKey && e.keyCode === 74)
      || (e.ctrlKey && e.shiftKey && e.keyCode === 75)
      || (e.ctrlKey && e.shiftKey && e.keyCode === 73)
      || (e.ctrlKey && e.shiftKey && e.keyCode === 67));

    window.document.oncontextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };
  }
}
