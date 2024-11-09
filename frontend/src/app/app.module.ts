import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field"

import {provideHttpClient} from "@angular/common/http"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue : {apperance: "outline", subscriptSizing: "dynamic"}
    }
  ]
})
export class AppModule { }
