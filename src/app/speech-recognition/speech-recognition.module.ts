import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeechRecognitionDialogComponent} from './components/speech-recognition-dialog/speech-recognition-dialog.component';

@NgModule({
  declarations: [
    SpeechRecognitionDialogComponent
  ],
  exports: [
    SpeechRecognitionDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SpeechRecognitionModule {
}
