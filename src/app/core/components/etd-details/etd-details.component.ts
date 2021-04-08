import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {EtdEntryMeta} from '../../../shared/model/etd-model';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-etd-details',
  templateUrl: './etd-details.component.html',
  styleUrls: ['./etd-details.component.css']
})
export class EtdDetailsComponent implements OnInit {

  public etdId: number;

  public etdDetails: EtdEntryMeta;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.etdId = params.etdId;
      this.getEtdDetails();
    });
  }

  public getEtdDetails(): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdEntryMeta>(`/public/etd/${this.etdId}`).subscribe(etdDetails => {
      this.etdDetails = etdDetails;
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  public downloadPdf(): void {
    window.open(`${environment.backendUrl}/public/etd/${this.etdId}/download`);
  }
}
