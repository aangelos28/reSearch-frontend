import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EtdSearchQuery, EtdSearchResults} from '../../../shared/model/etd-model';
import {SearchService} from '../../services/search/search.service';
import {ActivatedRoute} from '@angular/router';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {PageEvent} from '@angular/material/paginator';
import {SearchAdvancedComponent} from '../search-advanced/search-advanced.component';
import {MatDialog} from '@angular/material/dialog';
import {AccountService} from '../../../account/services/account/account.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public searchQuery: EtdSearchQuery;
  public searchResults: EtdSearchResults;

  public pageEvent: PageEvent;

  constructor(private httpClient: HttpClient, private searchService: SearchService, private accountService: AccountService,
              private route: ActivatedRoute, private workTracker: WorkTrackerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = {
        title: params.t,
        type: params.tp,
        subject: params.s,
        author: params.a,
        department: params.d,
        degreeGrantor: params.dg,
        publisher: params.pb,
        pageNumber: params.p
      };

      this.executeSearchQuery(this.searchQuery);
    });
  }

  public updatePage(event: PageEvent): PageEvent {
    this.searchQuery.pageNumber = event.pageIndex;

    // this.executeSearchQuery(this.searchQuery);
    this.searchService.initiateSearch(this.searchQuery);

    return event;
  }

  public executeSearchQuery(searchQuery: EtdSearchQuery): void {
    this.workTracker.startWork();
    this.httpClient.get<EtdSearchResults>('/public/etd/search-advanced',
      {params: this.searchService.makeQueryUrlTree(searchQuery).queryParams}).subscribe(searchResults => {
      this.searchResults = searchResults;
      this.workTracker.finishWork();
    }, () => this.workTracker.finishWork());
  }

  /**
   * Returns the title keywords in the search query as a string array.
   */
  public getSearchKeywordsAsArray(): string[] {
    let keywords: string[] = [];

    if (this.searchQuery.title?.length > 0) {
      keywords = keywords.concat(this.searchQuery.title.split(' '));
    }

    return keywords;
  }

  /**
   * Opens the advanced search dialog.
   */
  public openAdvancedSearchDialog(): void {
    this.dialog.open(SearchAdvancedComponent);
  }
}
