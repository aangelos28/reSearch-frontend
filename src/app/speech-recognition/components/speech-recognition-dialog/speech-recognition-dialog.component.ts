import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SpeechRecognitionService} from '../../services/speech-recognition/speech-recognition.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-speech-recognition-dialog',
  templateUrl: './speech-recognition-dialog.component.html',
  styleUrls: ['./speech-recognition-dialog.component.css']
})
export class SpeechRecognitionDialogComponent implements AfterViewInit, OnDestroy {

  private speechRecognitionResultSubscription: Subscription;

  constructor(private speechRecognitionService: SpeechRecognitionService,
              public dialogRef: MatDialogRef<SpeechRecognitionDialogComponent>) {
  }

  ngAfterViewInit(): void {
    this.startRecognition();
  }

  ngOnDestroy(): void {
    this.speechRecognitionResultSubscription.unsubscribe();
  }

  public startRecognition(): void {
    this.speechRecognitionService.startSpeechRecognition();
    this.speechRecognitionResultSubscription = this.speechRecognitionService.getResult().subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
