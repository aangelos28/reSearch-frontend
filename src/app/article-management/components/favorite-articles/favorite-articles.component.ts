import {Component, OnInit} from '@angular/core';
import {EtdEntryMeta} from '../../../shared/model/etd-model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.css']
})
export class FavoriteArticlesComponent implements OnInit {

  public articlesList: EtdEntryMeta[];

  constructor(private httpClient: HttpClient, private router: Router, private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
    this.getUserFavoriteArticles();
  }

  public getUserFavoriteArticles(): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdEntryMeta[]>('/private/etd/user/favorite').subscribe(articles => {
      this.articlesList = articles.reverse();
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  public removeFavoriteArticle(index: number): void {
    const articleId = this.articlesList[index].id;

    this.workTracker.startWork();
    this.httpClient.delete(`/private/etd/user/favorite/remove?i=${articleId}`).subscribe(() => {
      this.articlesList.splice(index, 1);
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }
}
