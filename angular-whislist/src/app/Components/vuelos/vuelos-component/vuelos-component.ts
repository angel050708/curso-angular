import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vuelos-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './vuelos-component.html',
  styleUrl: './vuelos-component.css',
})
export class VuelosComponent {

}
