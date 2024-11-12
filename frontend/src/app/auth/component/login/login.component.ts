import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { NotificationsService } from '@app/layout/services/notifications.service';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isFetching = false
  
  readonly formGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(4),
      Validators.min(20),
    ])
  })

  private readonly services = {
    authService: inject(AuthService),
    router: inject(Router),
    destryoRef: inject(DestroyRef),
    notification: inject(NotificationsService)
  }

  login() {
    const { authService, router, destryoRef, notification }= this.services
    const { email, password } = this.formGroup.value
    
    this.isFetching= true

    authService.postUserLogin({
      email: email || "",
      password: password|| ""
    })
      .pipe(takeUntilDestroyed(destryoRef))
      .pipe(delay(500))
      .subscribe({
        next: () => {
          router.navigateByUrl("/")
          notification.addSuccess("Login success")
          this.isFetching= false
        },
        error: () => {
          notification.addError("Failed to login, please make sure your credential")
          this.isFetching= false
        },
      })
  }
}


