import { DestroyRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type AuthQueryParam="login" | "signup"

@Injectable({
  providedIn: 'root'
})
export class AuthQueryService {

  readonly authParam = new BehaviorSubject<AuthQueryParam>("login")

  constructor(activeRouter:ActivatedRoute, destroyRef: DestroyRef) {
    activeRouter.queryParamMap
      .pipe(takeUntilDestroyed(destroyRef))
      .pipe(map(data=> data.get("auth") as AuthQueryParam || "login" ))
      .subscribe((data)=> this.authParam.next(data))
  }

}
