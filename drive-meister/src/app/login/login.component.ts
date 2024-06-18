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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
export class LoginComponent {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
    ),
  ]);

  emailerrorMessage = '';
  passworderrorMessage = '';

  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.passworderrorMessage = this.getErrorMessage(this.password, {
      required: 'この項目は必須です',
      minlength: '8文字以上で入力してください',
      pattern: '大文字、小文字、数字、記号をそれぞれ1文字以上含めてください',
    });

    this.emailerrorMessage = this.getErrorMessage(this.email, {
      required: 'この項目は必須です',
      email: 'メールアドレスの形式が正しくありません',
    });
  }

  getErrorMessage(
    control: FormControl,
    errorMessages: { [key: string]: string }
  ): string {
    if (control.errors) {
      const errorKey = Object.keys(control.errors)[0];
      return errorMessages[errorKey] || '';
    }
    return '';
  }
}
