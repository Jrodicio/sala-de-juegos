import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapeDinosaurioComponent } from './escape-dinosaurio.component';

describe('EscapeDinosaurioComponent', () => {
  let component: EscapeDinosaurioComponent;
  let fixture: ComponentFixture<EscapeDinosaurioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscapeDinosaurioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscapeDinosaurioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
