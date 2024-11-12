import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const userServices = inject(AuthService)
  const router= inject(Router)
  return userServices.user$.asObservable()
    .pipe(map((user) => {
        if (user === null) {
          router.navigateByUrl("/")
          return false
        }
        return true
      }));  
};
