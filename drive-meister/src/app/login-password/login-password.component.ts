import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-login-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.scss',
})
export class LoginPasswordComponent {
  hide = true;

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
    ),
  ]);

  passworderrorMessage = '';

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (!this.password.errors) {
      this.passworderrorMessage = '';
      return;
    }

    const errorMessages: { [key: string]: string } = {
      required: 'この項目は必須です',
      minlength: '8文字以上で入力してください',
      pattern: '大文字、小文字、数字、記号をそれぞれ1文字以上含めてください',
    };

    const errorKey = Object.keys(this.password.errors || {})[0];
    this.passworderrorMessage = errorMessages[errorKey] || '';
  }
}
