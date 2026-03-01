import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservasApiCliente {
  
  getAll(){
    return [
      {id: 1, name: 'uno'}, 
      {id: 2, name: 'dos'}
    ];
  }
}
