import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const newCredential = req.clone({
    withCredentials: true
  })
  return next(newCredential);
};
