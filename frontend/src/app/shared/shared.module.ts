import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronsLeft, ChevronsRight } from 'lucide-angular';
import { RouterModule } from '@angular/router';

import { PaginatorComponent } from "./components/paginator/paginator.component"

@NgModule({
  declarations:[PaginatorComponent],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ ChevronsLeft, ChevronsRight }),
    RouterModule
  ],
  exports: [PaginatorComponent]
})
export class SharedModule { }
