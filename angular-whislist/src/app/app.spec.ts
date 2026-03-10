import { TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { App } from './app';
import { reducerDestinosViajes } from './models/destinos-viajes-state.models';
import { reducerTracking } from './models/tracking-state.models';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideStore({ destinos: reducerDestinosViajes, tracking: reducerTracking }),
        provideAnimations(),
        provideHttpClient(),
        importProvidersFrom(TranslateModule.forRoot()),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title signal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('angular-whislist');
  });
});
