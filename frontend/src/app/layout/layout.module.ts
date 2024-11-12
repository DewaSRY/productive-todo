import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NotificationsComponent } from './components/notifications/notifications.component'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, X } from 'lucide-angular';

@NgModule({
  declarations: [
    NavigationComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule.pick({X })
  ],
  exports: [
    NavigationComponent,
    NotificationsComponent
  ]
})
export class LayoutModule { }
