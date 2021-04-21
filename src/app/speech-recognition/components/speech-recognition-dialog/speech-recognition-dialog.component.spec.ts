import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRecognitionDialogComponent } from './speech-recognition-dialog.component';

describe('SpeechRecognitionDialogComponent', () => {
  let component: SpeechRecognitionDialogComponent;
  let fixture: ComponentFixture<SpeechRecognitionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRecognitionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRecognitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
