import { Component, signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, AsyncPipe, TranslateModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-whislist');
  selectedLang = 'es';

  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLanguage(lang: string): void {
    this.selectedLang = lang;
    this.translate.use(lang);
  }
}
