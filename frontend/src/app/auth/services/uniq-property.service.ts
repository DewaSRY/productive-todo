import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { AuthService, Property } from './auth.service';
import { catchError, debounceTime, filter, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqPropertyService {

  constructor(private authServices: AuthService) { }

  uniqueProperty=(property: Property)=> {
      return (control: AbstractControl) => {
        const { value } = control
        return of(value).pipe(
          debounceTime(500), // Apply debounce to user input
          switchMap((data) => 
            this.authServices.postUniqueUserProperty({
              name: data, // Use the actual input value from the control
              property: property
            })
          ),
          filter(data=> !data.is_unique ),
          map(() => ({unique: true})),
          catchError(() => of(null)) // Gracefully handle errors
        );
      }
  }


}
