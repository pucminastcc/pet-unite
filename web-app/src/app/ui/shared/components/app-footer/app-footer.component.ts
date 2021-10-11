import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public developerName: string = 'Leonardo Suzuki';

  constructor() {
  }

  ngOnInit(): void {
  }
}
