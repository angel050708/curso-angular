import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { CommonModule } from '@angular/common';
import { MapComponent, MarkerComponent, PopupComponent } from 'ngx-mapbox-gl';
import { StyleSpecification } from 'mapbox-gl';
import { TrackingClickDirective } from '../../directives/tracking-click.directive';
import {
  DestinosApiClient,
  DestinosApiClientFake,
  DestinosApiClientViejo,
  APP_CONFIG,
  APP_CONFIG_VALUE,
  AppConfig,
} from '../../models/destinos-api-client.model';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, MapComponent, MarkerComponent, PopupComponent, TrackingClickDirective],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.css',
  providers: [
    // useClass: cuando se pida DestinosApiClient, Angular instancia DestinosApiClientFake
    { provide: DestinosApiClient, useClass: DestinosApiClientFake },
    // useExisting: DestinosApiClientViejo es un alias del mismo objeto creado arriba
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
    // InjectionToken: provee la configuración de la API
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
  ],
})
export class DestinoDetalle implements OnInit {
  destino: DestinoViaje | undefined;

  mapStyle: StyleSpecification = {
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
        paint: {
          'fill-color': '#6F788A'
        }
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    // useClass → recibe DestinosApiClientFake aunque se tipó como DestinosApiClient
    private apiClient: DestinosApiClient,
    // useExisting → misma instancia que apiClient
    private apiClientViejo: DestinosApiClientViejo,
    // InjectionToken → valor de APP_CONFIG_VALUE
    @Inject(APP_CONFIG) public appConfig: AppConfig,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destino = this.apiClient.getById(id);
    }
  }
}

