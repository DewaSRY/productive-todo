import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { MatchPasswordService } from '@app/auth/services/match-password.service';
import { UniqPropertyService } from "@app/auth/services/uniq-property.service"
import { NotificationsService } from '@app/layout/services/notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{
  isFetching = false
  
  private readonly services = {
    uniqProperty: inject(UniqPropertyService),
    passwordMatch: inject(MatchPasswordService),
    authServices: inject(AuthService),
    router: inject(Router),
    notification: inject(NotificationsService),
    destryoRef: inject(DestroyRef)
  }

  readonly formGroup = new FormGroup({
    name: new FormControl("",
      {
        validators: [
          Validators.required,
          Validators.minLength(4)
        ],
        asyncValidators: [
          (control) => this.services.uniqProperty.uniqueProperty("name")(control)
        ]
      }
    ),
    email: new FormControl("", {
      validators: [
        Validators.required,
        Validators.email
      ],
      asyncValidators: [
          (control) => this.services.uniqProperty.uniqueProperty("email")(control)
      ]
    }
  ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
  }, {
    validators: [this.services.passwordMatch.validate]
  })


  signup() {
    const { authServices, notification, router, destryoRef  } = this.services
    const { email, name, password } = this.formGroup.value

    this.isFetching = true
    
    authServices.postUserRegister({
      email: email || "",
      password: password || "",
      name: name || ""
    })
      .pipe(takeUntilDestroyed(destryoRef))
      .subscribe({
        next: () => {
          notification.addSuccess("Register success, wecome to the productive TODO")
          router.navigateByUrl('/')
          this.isFetching= false
        },
        error: () => {
          notification.addError("Failed to Register")
          this.isFetching= false
        }
    })
  }
}
