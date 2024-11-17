import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import { IndexRoutingModule } from './index-routing.module';
import { LayoutModule } from '@app/layout/layout.module';
import { HomeComponent } from './component/home/home.component';
import { LucideAngularModule, MoveRight} from 'lucide-angular';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    LucideAngularModule.pick({ MoveRight }),
  ]
})
export class IndexModule { }
