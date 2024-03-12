import { Component } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { ThemeText } from '../shared/enums/theme-text.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  public themeButtonText: string = ThemeText.light;
  public isThemeTextVisible: boolean = false;

  constructor(private _themeService: ThemeService) {}

  toggleDarkTheme(): void {
    this._themeService.toggleDarkTheme();
    if (this.themeButtonText === ThemeText.light) {
      this.themeButtonText = ThemeText.dark;
    } else if (this.themeButtonText === ThemeText.dark) {
      this.themeButtonText = ThemeText.light;
    }
  }

  showText() {
    this.isThemeTextVisible = true;
  }

  hideText() {
    this.isThemeTextVisible = false;
  }
}
