import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NotificationsComponent } from './components/notifications/notifications.component'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, X , SquareArrowRight, Menu} from 'lucide-angular';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    NavigationComponent,
    NotificationsComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule.pick({ X, SquareArrowRight, Menu }),
    MatToolbar,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    NavigationComponent,
    NotificationsComponent,
    SideNavComponent
  ]
})
export class LayoutModule { }
