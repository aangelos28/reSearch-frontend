import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {EtdClaimComment} from '../../../shared/model/etd-model';
import {AccountService} from '../../../account/services/account/account.service';

@Component({
  selector: 'app-etd-claim-comment-list',
  templateUrl: './etd-claim-comment-list.component.html',
  styleUrls: ['./etd-claim-comment-list.component.css']
})
export class EtdClaimCommentListComponent implements OnInit {

  @Input() etdId: number;
  @Input() commentsList: EtdClaimComment[];

  constructor(private httpClient: HttpClient, public accountService: AccountService, private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
  }

  public likeComment(index: number): void {
    if (this.commentsList[index].likeStatus <= 0) {
      // Like the comment if it is already disliked or neither liked or disliked
      this.workTracker.startWork();
      this.httpClient.put(`/private/etd/comment/${this.commentsList[index].id}/like`, undefined).subscribe(() => {
        if (this.commentsList[index].likeStatus < 0) {
          ++this.commentsList[index].likes;
        }

        this.commentsList[index].likeStatus = 1;
        ++this.commentsList[index].likes;

        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    } else {
      // Unlike the comment if it is already liked
      this.workTracker.startWork();
      this.httpClient.put(`/private/etd/comment/${this.commentsList[index].id}/unlike`, undefined).subscribe(() => {
        this.commentsList[index].likeStatus = 0;
        --this.commentsList[index].likes;

        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    }
  }

  public dislikeComment(index: number): void {
    if (this.commentsList[index].likeStatus >= 0) {
      // Dislike the comment if it is already liked or neither liked or disliked
      this.workTracker.startWork();
      this.httpClient.put(`/private/etd/comment/${this.commentsList[index].id}/dislike`, undefined).subscribe(() => {
        if (this.commentsList[index].likeStatus > 0) {
          --this.commentsList[index].likes;
        }

        this.commentsList[index].likeStatus = -1;
        --this.commentsList[index].likes;

        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    } else {
      // Undislike the comment if it is already disliked
      this.workTracker.startWork();
      this.httpClient.put(`/private/etd/comment/${this.commentsList[index].id}/undislike`, undefined).subscribe(() => {
        this.commentsList[index].likeStatus = 0;
        ++this.commentsList[index].likes;

        this.workTracker.finishWork();
      }, () => this.workTracker.finishWork());
    }
  }

  public formatLikes(likes: number): string {
    if (likes >= 0) {
      return `+${likes}`;
    } else {
      return `${likes}`;
    }
  }
}
