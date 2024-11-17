import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { User } from '@app/auth/model/auth';
import { AuthService } from '@app/auth/services/auth.service';
import { NotificationsService } from '@app/layout/services/notifications.service';
import { Observable } from 'rxjs';


interface NavigationIntem{
  title: string,
  url: string
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{
  sidenavMode: 'side' | 'push' = 'side';

  isOpen=true

  navigations: NavigationIntem[] = [
    {
      title: "Dashboard",
      url: "dashboard"
    },
    {
      title: "My task",
      url: "my-task"
    },
    // {
    //   title: "My Calender",
    //   url: "my-calender"
    // },
  ]

  private readonly services = {
    breakPoint: inject(BreakpointObserver),
    authServices: inject(AuthService),
    notification: inject(NotificationsService),
    destryoRef: inject(DestroyRef),
    router: inject(Router)
  }

  user$ = this.services.authServices.getUserSignedin()

  ngOnInit(): void {
    const { breakPoint, destryoRef } =this.services
    breakPoint.observe(['(min-width: 768px)'])
      .pipe(takeUntilDestroyed(destryoRef))
      .subscribe(result => {
        if (result.matches) {
          this.isOpen = true
          this.sidenavMode ="side"
        } else {
          this.isOpen = false
           this.sidenavMode ="push"
        }
    });
  }

  handleOpen() {
    if (this.sidenavMode === 'push') {
      this.isOpen = !this.isOpen
    }
  }

  logout() {
    const { authServices, destryoRef, notification, router } = this.services
    authServices.deleteLogout()
      .pipe(takeUntilDestroyed(destryoRef))
      .subscribe(() => {
        notification.addSuccess("Logout success, see you again")
        router.navigateByUrl("/")
    })

  }
}
