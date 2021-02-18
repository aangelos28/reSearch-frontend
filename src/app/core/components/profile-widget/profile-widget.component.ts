import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {

  public profileMenuHidden = true;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  /**
   * Toggle profile menu visibility.
   */
  public toggleProfileMenu(): void {
    this.profileMenuHidden = !this.profileMenuHidden;
  }

  /**
   * Listener for click event.
   * @param event event data
   */
  @HostListener('document:click', ['$event'])
  public clickOutside(event): void {
    // Hide profile menu if the user clicks outside the component
    if (!this.elementRef.nativeElement.contains(event.target) && !this.profileMenuHidden) {
      this.toggleProfileMenu();
    }
  }
}
