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
  selector: 'app-login-email',
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
  templateUrl: './login-email.component.html',
  styleUrl: './login-email.component.scss',
})
export class LoginEmailComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  emailerrorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    const errorMessages: { [key: string]: string } = {
      required: 'この項目は必須です',
      email: 'メールアドレスの形式が正しくありません',
    };

    const errorKey = Object.keys(this.email.errors || {})[0];
    this.emailerrorMessage = errorMessages[errorKey] || '';
  }
}
