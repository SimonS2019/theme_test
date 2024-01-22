import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isDarkMode(): boolean {
    return this.currentTheme === 'dark-theme';
  }

  private currentTheme = 'light-theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('activeTheme') || 'light-theme';
    this.loadTheme(this.currentTheme);
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'dark-theme' : 'light-theme';
    this.loadTheme(this.currentTheme);
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }

  loadTheme(themeName: string) {
    const head = this.document.getElementsByTagName('head')[0];
  
    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      // If we already have a theme, change its href
      themeLink.href = `${themeName}.css`;
    } else {
      // Else, create the link element for theme
      themeLink = this.document.createElement('link');
      themeLink.id = 'client-theme';
      themeLink.rel = 'stylesheet';
      themeLink.href = `${themeName}.css`;
  
      // Add the theme to the head
      head.appendChild(themeLink);
    }
  }
}