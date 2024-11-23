import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [NgClass],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
}