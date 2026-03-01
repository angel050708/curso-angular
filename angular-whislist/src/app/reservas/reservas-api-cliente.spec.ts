import { TestBed } from '@angular/core/testing';

import { ReservasApiCliente } from './reservas-api-cliente';

describe('ReservasApiCliente', () => {
  let service: ReservasApiCliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasApiCliente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
