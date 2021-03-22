import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtdDetailsComponent } from './etd-details.component';

describe('EtdDetailsComponent', () => {
  let component: EtdDetailsComponent;
  let fixture: ComponentFixture<EtdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
