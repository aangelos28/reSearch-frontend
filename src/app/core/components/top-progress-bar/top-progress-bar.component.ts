import { Component, OnInit } from '@angular/core';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-top-progress-bar',
  templateUrl: './top-progress-bar.component.html',
  styleUrls: ['./top-progress-bar.component.css']
})
export class TopProgressBarComponent implements OnInit {

  constructor(public workTracker: WorkTrackerService) { }

  ngOnInit(): void {
  }

}
