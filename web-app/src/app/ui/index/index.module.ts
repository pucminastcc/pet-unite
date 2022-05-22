import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexRoutingModule} from './index-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    CarouselModule
  ]
})
export class IndexModule {
}
