import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosJugadorComponent } from './datos-jugador.component';

describe('DatosJugadorComponent', () => {
  let component: DatosJugadorComponent;
  let fixture: ComponentFixture<DatosJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosJugadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
