import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../account/services/auth/auth.service';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {

  public profileMenuHidden = true;

  constructor(private elementRef: ElementRef, private authService: AuthService) {
  }

  ngOnInit(): void {
    // Empty
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

  public logout(): void {
    this.authService.logoutFirebase().then(() =>
      window.location.reload()
    );
  }
}
