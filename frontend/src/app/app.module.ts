import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {provideHttpClient, withInterceptors} from "@angular/common/http"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { credentialsInterceptor } from "@app/core/interceptors/credentials.interceptor"
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(
      withInterceptors([credentialsInterceptor])
    ),

  ]
})
export class AppModule { }
