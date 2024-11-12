import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "@environments/environment"

import { AuthResponse, LoginPyload, SignupPyload, UserResponse } from "@app/auth/model/auth"

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
  
  private readonly services = {
    httpClient: inject(HttpClient)
  }

  getUserSignedin() {
    const {httpClient} = this.services
    return httpClient.get<UserResponse>(this.endpoint+ "/signin")
  }
  
  postUserRegister(pyload: SignupPyload) {
    const {httpClient} = this.services
    return httpClient.post<AuthResponse>(this.endpoint+ "/signup", pyload)
  }

  deleteLogout() {
    const {httpClient} = this.services
    return httpClient.delete<void>(this.endpoint+ "/logout")
  }

  postUserLogin(pyload: LoginPyload) {
    const {httpClient} = this.services
    return httpClient.post<AuthResponse>(this.endpoint+ "/login", pyload)
  }

  postUniqueUserProperty(pyload: UniqProperty) {
    const { httpClient } = this.services
    return httpClient.post<UniquePropertyResponse>(this.endpoint+ "/unique-property", pyload)
  }

}
