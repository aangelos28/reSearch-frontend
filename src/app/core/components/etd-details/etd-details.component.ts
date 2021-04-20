import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EtdEntryMeta} from '../../../shared/model/etd-model';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {environment} from '../../../../environments/environment';
import {AccountService} from '../../../account/services/account/account.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-etd-details',
  templateUrl: './etd-details.component.html',
  styleUrls: ['./etd-details.component.css']
})
export class EtdDetailsComponent implements OnInit, OnDestroy {

  public etdId: number;

  public etdDetails: EtdEntryMeta;

  public isFavorite: boolean;

  private favoriteSubscription: Subscription;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, public accountService: AccountService,
              private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.etdId = params.etdId;
      this.getEtdDetails();
      this.getArticleIsFavorite();
    });
  }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
  }

  public getEtdDetails(): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdEntryMeta>(`/public/etd/${this.etdId}`).subscribe(etdDetails => {
      this.etdDetails = etdDetails;
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  public getArticleIsFavorite(): void {
    this.favoriteSubscription = this.accountService.isLoggedInAndVerified.subscribe(loggedIn => {
      if (!loggedIn) {
        return;
      }

      this.workTracker.startWork();
      this.httpClient.get<boolean[]>(`/private/etd/user/favorite/check?i=${this.etdId}`).subscribe(isFavorite => {
        this.isFavorite = isFavorite[0];
        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    });
  }

  public addArticleFavorite(): void {
    this.workTracker.startWork();
    this.httpClient.put(`/private/etd/user/favorite/add?i=${this.etdId}`, undefined).subscribe(() => {
      this.isFavorite = true;
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  public downloadPdf(): void {
    window.open(`${environment.backendUrl}/public/etd/${this.etdId}/download`);
  }
}
