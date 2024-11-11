import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "@environments/environment"

import { AuthResponse, LoginPyload, SignupPyload, UserResponse } from "@app/auth/model/auth"

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


}
