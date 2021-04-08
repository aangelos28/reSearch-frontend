import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtdClaimCommentListComponent } from './etd-claim-comment-list.component';

describe('EtdClaimCommentListComponent', () => {
  let component: EtdClaimCommentListComponent;
  let fixture: ComponentFixture<EtdClaimCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtdClaimCommentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtdClaimCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
