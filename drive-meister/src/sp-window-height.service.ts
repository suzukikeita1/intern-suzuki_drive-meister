import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpWindowHeightService {
  setVhProperty() {
    if (typeof window !== 'undefined') {
      var height = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${height / 100}px`);
    }
  }
}
