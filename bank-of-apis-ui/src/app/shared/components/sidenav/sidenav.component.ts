import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() navigate = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}

  logout() {
    this.auth.logout();
    this.notify.success('Logged out successfully');
    this.router.navigate(['/auth/login']);
    this.navigate.emit();
  }
}