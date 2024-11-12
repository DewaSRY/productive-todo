import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "@environments/environment"

import { AuthResponse, LoginPyload, SignupPyload, UserResponse,User } from "@app/auth/model/auth"
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

export type Property=  "name" | 'email'
export interface UniqProperty{
  property: Property,
  name: string
}

export interface UniquePropertyResponse{ is_unique: boolean}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = `${environment.domain}/user`
  user$= new BehaviorSubject<User| null>(null)
  private readonly services = {
    httpClient: inject(HttpClient)
  }

  getUserSignedin(): Observable<User> {
    const { httpClient } = this.services
    if (this.user$.value !== null) {
      return of(this.user$.value)
    }
    return httpClient.get<UserResponse>(this.endpoint + "/signin")
      .pipe(map(response=> response.data))
      .pipe(tap(response => this.user$.next(response)))
        
  }
  
  postUserRegister(pyload: SignupPyload): Observable<User> {
    const { httpClient } = this.services
    if (this.user$.value !== null) {
      return of(this.user$.value)
    }
    return httpClient.post<AuthResponse>(this.endpoint + "/signup", pyload)
      .pipe(map(response=> response.data))
      .pipe(tap(response => this.user$.next(response)))
  }

  postUserLogin(pyload: LoginPyload): Observable<User> {
    const { httpClient } = this.services
    if (this.user$.value !== null) {
      return of(this.user$.value)
    }
    return httpClient.post<AuthResponse>(this.endpoint + "/login", pyload)
      .pipe(map(response=> response.data))
      .pipe(tap(response => this.user$.next(response)))
  }

  deleteLogout() {
    const {httpClient} = this.services
    return httpClient.delete<void>(this.endpoint + "/logout")
      .pipe(tap(()=>this.user$.next(null)))
  }

  postUniqueUserProperty(pyload: UniqProperty) {
    const { httpClient } = this.services
    return httpClient.post<UniquePropertyResponse>(this.endpoint+ "/unique-property", pyload)
  }

}
