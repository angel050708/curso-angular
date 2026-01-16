import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDestino } from './lista-destino';

describe('ListaDestino', () => {
  let component: ListaDestino;
  let fixture: ComponentFixture<ListaDestino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDestino]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDestino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
