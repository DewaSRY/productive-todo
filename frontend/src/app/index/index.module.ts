import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { LayoutModule } from '@app/layout/layout.module';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LayoutModule
  ]
})
export class IndexModule { }
