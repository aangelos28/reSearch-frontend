import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../account/services/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../account/services/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isLoggedInAndVerified: boolean = null;

  private subscriptions = new Subscription();

  constructor(public accountService: AccountService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.accountService.isLoggedInAndVerified.subscribe(isLoggedInAndVerified =>
      this.isLoggedInAndVerified = isLoggedInAndVerified
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  public isOnLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  /**
   * Login button should not be shown on the login page.
   */
  public atLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
