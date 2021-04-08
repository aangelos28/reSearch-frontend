import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {EtdClaimComment} from '../../../shared/model/etd-model';

@Component({
  selector: 'app-etd-claim-comment-list',
  templateUrl: './etd-claim-comment-list.component.html',
  styleUrls: ['./etd-claim-comment-list.component.css']
})
export class EtdClaimCommentListComponent implements OnInit {

  @Input() etdId: number;
  @Input() commentsList: EtdClaimComment[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
