import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPageLoginLogoutComponent } from '../../components/my-page-login-logout/my-page-login-logout.component';
import { ReturnHomeButtonComponent } from '../../components/return-home-button/return-home-button.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DialogComponent,
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
    MatDialogModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;

  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
    ),
  ]);

  emailerrorMessage: string = '';
  passworderrorMessage: string = '';

  constructor(private authService: AuthService, public dialog: MatDialog) {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  register() {
    this.authService.register(this.email.value!, this.password.value!);
    this.openDialog('register');
  }

  openDialog(type: 'login' | 'register') {
    this.dialog.open(DialogComponent, {
      data: { type },
    });
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
    control: FormControl<string | null>,
    errorMessages: { [key: string]: string }
  ): string {
    if (control.errors) {
      const errorKey = Object.keys(control.errors)[0];
      return errorMessages[errorKey] || '';
    }
    return '';
  }

}
