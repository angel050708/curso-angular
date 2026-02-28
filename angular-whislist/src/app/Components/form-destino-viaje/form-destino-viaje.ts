
import { EventEmitter, Component, OnInit, Output, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { from } from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter();
  fg: FormGroup;
  private fb = inject(FormBuilder);
  minLongitud = 3;
  searchResults: string[] = [];

  constructor() {
    this.onItemAdded = new EventEmitter();
    this.fg = this.fb.group({
      nombre: ['', [Validators.compose([Validators.required, this.nombreValidatorParametrizable(this.minLongitud).bind(this)])]],
      url: [''],
      
      
    });
    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ' + JSON.stringify(form));
    });
  }

  ngOnInit() {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
        switchMap(text => ajax('assets/datos.json'))
    )
    .subscribe((ajaxResponse) => {
      console.log(ajaxResponse);
      console.log(ajaxResponse.response);
      this.searchResults = ajaxResponse.response as string[];
    });
  }


  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url, 0);
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