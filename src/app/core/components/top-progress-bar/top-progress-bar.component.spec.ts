import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProgressBarComponent } from './top-progress-bar.component';

describe('TopProgressBarComponent', () => {
  let component: TopProgressBarComponent;
  let fixture: ComponentFixture<TopProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
