import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VuelosComponent } from './vuelos-component';

describe('VuelosComponent', () => {
  let component: VuelosComponent;
  let fixture: ComponentFixture<VuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(VuelosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
