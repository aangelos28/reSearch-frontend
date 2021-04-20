import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EtdClaimComment} from '../../../shared/model/etd-model';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {AccountService} from '../../../account/services/account/account.service';
import {Subscription} from 'rxjs';

interface Reproducible {
  name: string;
  value: number;
}

@Component({
  selector: 'app-etd-claim-comment-container',
  templateUrl: './etd-claim-comment-container.component.html',
  styleUrls: ['./etd-claim-comment-container.component.css']
})
export class EtdClaimCommentContainerComponent implements OnInit, OnDestroy {

  @Input() etdId: number;

  public addCommentForm: FormGroup;
  public addCommentFormVisible = false;

  public commentsList: EtdClaimComment[];

  public readonly REPRODUCIBLE_OPTIONS: Reproducible[] = [
    {name: 'YES', value: 2},
    {name: 'PARTIALLY', value: 1},
    {name: 'NO', value: 0}
  ];

  private likeStatusesSubscription: Subscription;

  constructor(private httpClient: HttpClient, public accountService: AccountService, private workTracker: WorkTrackerService) {
    this.commentsList = [];
  }

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      claim: new FormControl('', [
        Validators.required
      ]),
      reproducible: new FormControl('', [
        Validators.required
      ]),
      proofSourceCodeUrl: new FormControl(''),
      proofDataSetUrl: new FormControl(''),
      results: new FormControl('', [
        Validators.required
      ])
    });

    this.getClaimComments();
  }

  ngOnDestroy(): void {
    this.likeStatusesSubscription.unsubscribe();
  }

  get claimField(): AbstractControl {
    return this.addCommentForm.get('claim');
  }

  get reproducibleField(): AbstractControl {
    return this.addCommentForm.get('reproducible');
  }

  get proofSourceCodeUrlField(): AbstractControl {
    return this.addCommentForm.get('proofSourceCodeUrl');
  }

  get proofDataSetUrlField(): AbstractControl {
    return this.addCommentForm.get('proofDataSetUrl');
  }

  get resultsField(): AbstractControl {
    return this.addCommentForm.get('results');
  }

  public showAddCommentForm(): void {
    this.addCommentFormVisible = true;
  }

  public hideAddCommentForm(): void {
    this.addCommentFormVisible = false;
  }

  /**
   * Gets the claim comments for the ETD.
   */
  public getClaimComments(): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdClaimComment[]>(`/public/etd/${this.etdId}/comments`).subscribe(comments => {
        this.commentsList = comments.reverse();
        this.workTracker.finishWork();
        this.getLikeStatuses();
      },
      () => {
      },
      () => this.workTracker.finishWork());
  }

  private getLikeStatuses(): void {
    this.likeStatusesSubscription = this.accountService.isLoggedInAndVerified.subscribe(loggedIn => {
      if (!loggedIn) {
        return;
      }

      let params = new HttpParams();
      for (const comment of this.commentsList) {
        params = params.append('i', String(comment.id));
      }

      this.workTracker.startWork();
      this.httpClient.get<number[]>(`/private/etd/comment/like-statuses`, {params}).subscribe(likeStatuses => {
        likeStatuses = likeStatuses.reverse();
        for (let i = 0; i < likeStatuses.length; ++i) {
          this.commentsList[i].likeStatus = likeStatuses[i];
        }
        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    });
  }

  /**
   * Adds a new claim comment to the ETD.
   */
  public addClaimComment(): void {
    const etdCommentData: EtdClaimComment = {
      claim: this.claimField.value,
      reproducible: this.reproducibleField.value,
      proofSourceCodeUrl: this.proofSourceCodeUrlField.value,
      proofDatasetUrl: this.proofDataSetUrlField.value,
      results: this.resultsField.value
    };

    this.workTracker.startWork();
    this.httpClient.post<EtdClaimComment>(`/private/etd/${this.etdId}/comment/add`, etdCommentData).subscribe(newComment => {
        this.commentsList.unshift(newComment);
        this.workTracker.finishWork();
        this.hideAddCommentForm();
      },
      () => {
      },
      () => {
        this.workTracker.finishWork();
      });
  }
}
