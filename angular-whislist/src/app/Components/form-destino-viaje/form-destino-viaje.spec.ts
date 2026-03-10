import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormDestinoViaje } from './form-destino-viaje';

describe('FormDestinoViaje', () => {
  let component: FormDestinoViaje;
  let fixture: ComponentFixture<FormDestinoViaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDestinoViaje],
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormDestinoViaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
