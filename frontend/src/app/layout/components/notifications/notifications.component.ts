import { Component, inject, OnInit } from '@angular/core';
import { Command, NotificationsService } from '@app/layout/services/notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  
  private readonly services = {
    notificationServices: inject(NotificationsService)
  }

  messages: Observable<Command[]> = this.services.notificationServices.messagesOutputs

  get notifications() {
    return this.services.notificationServices.messagesOutputs
  }

  clearMessage(id: number) {
    this.services.notificationServices.clearMessage(id)
  }

}
