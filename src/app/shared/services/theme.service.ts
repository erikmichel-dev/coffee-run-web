import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
