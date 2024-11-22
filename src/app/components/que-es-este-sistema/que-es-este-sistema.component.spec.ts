import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueEsEsteSistemaComponent } from './que-es-este-sistema.component';

describe('QueEsEsteSistemaComponent', () => {
  let component: QueEsEsteSistemaComponent;
  let fixture: ComponentFixture<QueEsEsteSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueEsEsteSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueEsEsteSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
