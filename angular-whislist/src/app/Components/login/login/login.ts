import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent, MarkerComponent, PopupComponent } from 'ngx-mapbox-gl';
import { StyleSpecification } from 'mapbox-gl';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MapComponent, MarkerComponent, PopupComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  mensajeError: string = '';

  // mapStyle para el mapa de login
  style: StyleSpecification = {
    version: 8,
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    layers: [
      {
        id: 'countries',
        type: 'fill',
        source: 'world',
        layout: {},
        paint: { 'fill-color': '#6F788A' }
      }
    ]
  };

  constructor(public authService: Auth) {
    this.mensajeError = '';
  }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout(() => {
        this.mensajeError = '';
      }, 2500);
    }
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
