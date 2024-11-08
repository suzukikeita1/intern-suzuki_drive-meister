import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data.type === 'login') {
      this.message = 'ログインが完了しました';
    }
    if (this.data.type === 'register') {
      this.message = '新規登録が完了しました';
    }
  }
}
