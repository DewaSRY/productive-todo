import { Component, inject, OnInit } from '@angular/core';
import { AuthQueryService, AuthQueryParam } from '@app/auth/services/auth-query.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrl: './auth-home.component.scss'
})
export class AuthHomeComponent implements OnInit {

  authPara: AuthQueryParam = "login"

  private readonly services = {
    authQuery: inject(AuthQueryService)
  }

  ngOnInit(): void {
    const { authQuery } = this.services
    authQuery.authParam.subscribe(data=> this.authPara= data)
  }


  get revertAuthParam():AuthQueryParam {
    return this.authPara === "login" ? "signup" : 'login'
  }
}
