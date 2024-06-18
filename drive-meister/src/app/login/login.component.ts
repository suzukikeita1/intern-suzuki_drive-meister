import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPageLoginLogoutComponent } from '../my-page-login-logout/my-page-login-logout.component';
import { ReturnHomeButtonComponent } from '../return-home-button/return-home-button.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginEmailComponent } from '../login-email/login-email.component';
import { LoginPasswordComponent } from '../login-password/login-password.component';
import { LoginSubmitComponent } from '../login-submit/login-submit.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginEmailComponent,
    LoginSubmitComponent,
    LoginPasswordComponent,
    MyPageLoginLogoutComponent,
    ReturnHomeButtonComponent,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
