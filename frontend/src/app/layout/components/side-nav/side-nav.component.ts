import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';


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
    {
      title: "My Calender",
      url: "my-calender"
    },
  ]

  private readonly services = {
    breakPoint: inject(BreakpointObserver)
  }

  ngOnInit(): void {
    this.services.breakPoint.observe(['(min-width: 768px)'])
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
    this.isOpen = !this.isOpen
  }
}
