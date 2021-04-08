import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtdClaimCommentContainerComponent } from './etd-claim-comment-container.component';

describe('EtdClaimCommentContainerComponent', () => {
  let component: EtdClaimCommentContainerComponent;
  let fixture: ComponentFixture<EtdClaimCommentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtdClaimCommentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtdClaimCommentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
