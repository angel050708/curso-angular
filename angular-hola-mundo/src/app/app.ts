import { Component, signal } from '@angular/core';
import { Saludador } from './saludador/saludador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Saludador],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('angular-hola-mundo');
}
