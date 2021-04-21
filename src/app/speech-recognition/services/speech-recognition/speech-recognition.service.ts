import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {BrowserInfoService} from '../../../shared/services/browser-info/browser-info.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  private speechRecognition: SpeechRecognition;

  private result$: Subject<string>;
  private confidence$: Subject<number>;

  private readonly _isCompatibleWithBrowser: boolean;
  private running: boolean;

  constructor(private browserInfoService: BrowserInfoService) {
    if (!browserInfoService.onChrome && !browserInfoService.onEdge) {
      this._isCompatibleWithBrowser = false;
      return;
    }
    this._isCompatibleWithBrowser = true;

    const {webkitSpeechRecognition} = (window as any);
    this.speechRecognition = new webkitSpeechRecognition();

    this.speechRecognition.addEventListener('start', () => {
      console.log('Initialized speech recognition module.');
    });

    this.speechRecognition.addEventListener('speechend', () => {
      this.speechRecognition.stop();
      this.running = false;
      console.log('Speech recognition end.');
    });

    this.speechRecognition.addEventListener('result', (e: SpeechRecognitionEvent) => {
      console.log(`Got result: ${e.results[0][0].transcript}`);
      this.result$.next(e.results[0][0].transcript);
      this.confidence$.next(e.results[0][0].confidence);
    });

    this.speechRecognition.addEventListener('nomatch', (e: any) => {
      this.result$.next('undefined');
      this.confidence$.next(undefined);
      console.log(`Speech recognition identified no match: ${e.error}`);
    });

    this.speechRecognition.addEventListener('error', (e: any) => {
      console.log(`There was an error with speech recognition: ${e.error}`);
    });
  }

  public startSpeechRecognition(): void {
    this.result$ = new Subject();
    this.confidence$ = new Subject();

    this.speechRecognition.start();
    this.running = true;
    console.log('Speech recognition start.');
  }

  public stopSpeechRecognition(): void {
    this.speechRecognition.stop();
    this.running = false;
    console.log('Speech recognition end.');
  }

  public getResult(): Subject<string> {
    return this.result$;
  }

  public getConfidence(): Subject<number> {
    return this.confidence$;
  }

  public isRunning(): boolean {
    return this.running;
  }

  get isCompatibleWithBrowser(): boolean {
    return this._isCompatibleWithBrowser;
  }
}
