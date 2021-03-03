import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkTrackerService {

  private _workCounter = 0;

  constructor() {
  }

  public startWork(): void {
    ++this._workCounter;
  }

  public finishWork(): void {
    --this._workCounter;
  }

  public hasWork(): boolean {
    return this._workCounter > 0;
  }

  get workCounter(): number {
    return this._workCounter;
  }
}
