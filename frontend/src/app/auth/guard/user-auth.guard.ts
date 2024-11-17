import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const userServices = inject(AuthService)
  const router= inject(Router)
  return userServices.getUserSignedin()
    .pipe(map((user) => {
        if (user === null) {
          return router.createUrlTree(['/']);
      }
        return true
      }));  
};
