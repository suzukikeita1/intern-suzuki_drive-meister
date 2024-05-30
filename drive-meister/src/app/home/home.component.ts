import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpWindowHeightService } from '../../sp-window-height.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private spWindowHeightService: SpWindowHeightService) {
    this.spWindowHeightService.setVhProperty();
  }

  @HostListener('window:resize')
  onResize() {
    this.spWindowHeightService.setVhProperty();
  }
}
