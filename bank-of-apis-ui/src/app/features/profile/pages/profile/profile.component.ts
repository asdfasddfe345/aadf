import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  twoFactorEnabled = false;
  currentUserId = 1; // This should be extracted from JWT token

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['']
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    
    // For now, get the first user as an example
    // In a real app, you'd extract the user ID from the JWT token
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        if (users.length > 0) {
          const user = users[0];
          this.profileForm.patchValue({
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address
          });
          this.currentUserId = user.userId;
        }
      },
      error: (error) => {
        this.notify.error('Failed to load profile');
        console.error('Error loading profile:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.notify.error('Please fill in all required fields');
      return;
    }

    this.loading = true;
    const profileData = this.profileForm.value;

    this.authService.updateUser(this.currentUserId, profileData).subscribe({
      next: () => {
        this.notify.success('Profile updated successfully');
      },
      error: (error) => {
        this.notify.error('Failed to update profile');
        console.error('Error updating profile:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.loadProfile();
  }

  changePassword() {
    this.notify.info('Change password functionality coming soon');
  }

  toggleTwoFactor(event: any) {
    this.twoFactorEnabled = event.checked;
    this.notify.info(`Two-factor authentication ${this.twoFactorEnabled ? 'enabled' : 'disabled'}`);
  }

  viewLoginHistory() {
    this.notify.info('Login history functionality coming soon');
  }
}