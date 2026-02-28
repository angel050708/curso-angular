import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosService } from '../services/destinos.service';
import { DestinoViaje } from '../models/destino-viaje.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.css',
})
export class DestinoDetalle implements OnInit {
  destino: DestinoViaje | undefined;

  constructor(private route: ActivatedRoute, private svc: DestinosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino= null!;
  }
}
