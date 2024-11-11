import { Component, DestroyRef, inject } from '@angular/core';

import { AuthService } from '@app/auth/services/auth.service';
import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AuthQueryService } from '@app/auth/services/auth-query.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  
  
  private readonly services = {
    authServices: inject(AuthService),
    destroyRef: inject(DestroyRef),
    authQuery: inject(AuthQueryService)
  }

  auth$= new BehaviorSubject(false)
  
  authLink : "login" | "signup" = "login"
 
  ngOnInit(): void {
    this.setupParamObserver()
    this.setupSigninObserver()
  }

  private  setupParamObserver() {
    const { authQuery } = this.services
    authQuery.authParam.subscribe(data => this.authLink = data)
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
