import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydialogComponent } from './mydialog.component';

describe('MydialogComponent', () => {
  let component: MydialogComponent;
  let fixture: ComponentFixture<MydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MydialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
