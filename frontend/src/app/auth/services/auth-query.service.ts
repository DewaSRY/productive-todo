import { DestroyRef, inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthQueryService {

  readonly authParam = new BehaviorSubject<"login" | "signup">("login")
  
  constructor(activeRouter:ActivatedRoute, destroyRef: DestroyRef) {
    activeRouter.queryParamMap
      .pipe(takeUntilDestroyed(destroyRef))
      .pipe(map(data=> data.get("auth") as "login" | "signup" || "login" ))
      .subscribe((data)=> this.authParam.next(data))
  }

}
