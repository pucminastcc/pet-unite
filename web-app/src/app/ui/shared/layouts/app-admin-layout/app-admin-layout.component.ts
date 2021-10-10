import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './app-admin-layout.component.html',
  styleUrls: ['./app-admin-layout.component.scss']
})
export class AppAdminLayoutComponent implements OnInit {
  isLoading = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
