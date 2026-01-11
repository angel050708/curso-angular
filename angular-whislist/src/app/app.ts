import { Component, signal } from '@angular/core';
import { DestinoViaje } from './destino-viaje/destino-viaje';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DestinoViaje],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-whislist');
}
