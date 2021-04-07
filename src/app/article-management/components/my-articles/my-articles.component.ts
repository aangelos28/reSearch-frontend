import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EtdEntryMeta} from '../../../shared/model/search-model';
import {HttpClient} from '@angular/common/http';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  public articlesList: EtdEntryMeta[];

  constructor(private httpClient: HttpClient, private router: Router, private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
    this.getUserArticles();
  }

  public getUserArticles(): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdEntryMeta[]>('/private/etd/user/all').subscribe(articles => {
      this.articlesList = articles;
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  public addArticle(): void {
    this.router.navigate(['/add-article']);
  }
}
