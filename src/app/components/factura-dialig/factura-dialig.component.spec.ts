import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDialigComponent } from './factura-dialig.component';

describe('FacturaDialigComponent', () => {
  let component: FacturaDialigComponent;
  let fixture: ComponentFixture<FacturaDialigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaDialigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDialigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
