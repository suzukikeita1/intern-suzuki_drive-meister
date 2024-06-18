import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-submit',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './login-submit.component.html',
  styleUrl: './login-submit.component.scss',
})
export class LoginSubmitComponent {}
