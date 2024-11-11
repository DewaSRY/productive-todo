import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NotificationsComponent } from './components/notifications/notifications.component'

@NgModule({
  declarations: [
    NavigationComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButton
  ],
  exports: [
    NavigationComponent,
    NotificationsComponent
  ]
})
export class LayoutModule { }
