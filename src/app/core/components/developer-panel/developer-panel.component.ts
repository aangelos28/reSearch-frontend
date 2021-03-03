import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.css']
})
export class DeveloperPanelComponent implements OnInit {

  public developerPanelVisible = false;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    // Nothing to initialize
  }

  public toggleDeveloperPanel(): void {
    this.developerPanelVisible = !this.developerPanelVisible;
  }
}
