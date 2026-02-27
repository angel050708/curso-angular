
import { EventEmitter, Component, OnInit, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter();
  fg: FormGroup;
  private fb = inject(FormBuilder);
  minLongitud = 3;

  constructor() {
    this.onItemAdded = new EventEmitter();
    this.fg = this.fb.group({
      nombre: ['', [Validators.compose([Validators.required, this.nombreValidatorParametrizable(this.minLongitud).bind(this)])]],
      url: ['']
    });
  }

  ngOnInit() {
    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ' + JSON.stringify(form));
    });
  }


  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    this.fg.reset();
    return false;
  }

  nombreValidator(control: AbstractControl): { [s: string]: boolean } | null {
    const l = control.value?.toString().trim().length || 0;
    if (l > 0 && l < this.minLongitud) {
      return { 'minLongNombre': true };
    }
    return null;
  }

  nombreValidatorParametrizable(minLongitud: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = control.value?.toString().trim().length || 0;
      if (l > 0 && l < minLongitud) {
        return { 'minLongNombre': true };
      }
      return null;
    };
  }

}