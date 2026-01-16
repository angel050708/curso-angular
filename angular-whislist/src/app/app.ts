import { Component, signal } from '@angular/core';
import { ListaDestino } from './lista-destino/lista-destino';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaDestino],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-whislist');
}
