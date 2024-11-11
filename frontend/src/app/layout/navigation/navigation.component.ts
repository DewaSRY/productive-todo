import { Component, DestroyRef, inject } from '@angular/core';

import { AuthService } from '@app/auth/services/auth.service';
import { UserResponse } from '@app/auth/model/auth';
import { BehaviorSubject, catchError, EMPTY, filter, map, Observable  } from 'rxjs'
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  
  
  private readonly services = {
    authServices: inject(AuthService),
    activeRouter: inject(ActivatedRoute),
    destroyRef: inject(DestroyRef)
  }

  auth$= new BehaviorSubject(false)
  
  authLink : "login" | "signup" = "login"
 
  ngOnInit(): void {
    this.setupParamObserver()
    this.setupSigninObserver()
  }

  private  setupParamObserver() {
    const { destroyRef, activeRouter } = this.services
    activeRouter.queryParamMap
      .pipe(
        takeUntilDestroyed(destroyRef),
        map(param => param.get("auth") as "login" | "signup" || "login")
      )
      .subscribe({
        next: data => { this.authLink= data }
    })
  } 

  private setupSigninObserver() {
    const { destroyRef, authServices } = this.services
    authServices.getUserSignedin()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe({
        next: () => { this.auth$.next(true) },
        error: ()=>{ this.auth$.next(false) }
      })
  }

  logout() {
    const { destroyRef, authServices } = this.services
    authServices.deleteLogout()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(()=> this.auth$.next(false))
  }

}
