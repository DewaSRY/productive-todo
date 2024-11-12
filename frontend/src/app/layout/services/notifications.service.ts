import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command{
  id: number,
  type: "success" | "error" | "clear"
  text?: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messaeInput!: Subject<Command>;
  messagesOutputs!: Observable<Command[]>;

  constructor() {
    this.messaeInput = new Subject<Command>();
    this.messagesOutputs = this.messaeInput.pipe(
      scan((acc: Command[], value: Command) => {
        
        if (value.type === 'clear') {
          return acc.filter(m => m.id !== value.id);
        }

        return [...acc, value];
      }, [])
    );

  } 

  addSuccess(message: string) {
    this.putMessage(message, 'success')
  }

  addError(message: string) {
    this.putMessage(message, 'error')
  }

  clearMessage(id: number) {
    this.messaeInput.next({id, type: 'clear'})
  }

  private putMessage(message: string, type: "success" | "error") {
    const id = Math.random() * 1000

    setTimeout(() => {
      this.messaeInput.next({
        id,
        text: message,
        type: type
      })
    }, 300)
    
    setTimeout(()=> {this.clearMessage(id)}, 3000)

  }
}
