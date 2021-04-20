import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {EtdSearchQuery} from '../../../shared/model/etd-model';
import {NavbarSearchService} from '../../services/navbar-search/navbar-search.service';
import {SearchService} from '../../../search/services/search/search.service';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css']
})
export class NavbarSearchComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private searchService: SearchService, private navbarSearchService: NavbarSearchService) {
    // Empty
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchText: this.navbarSearchService.query
    });
  }

  get searchText(): AbstractControl {
    return this.searchForm.get('searchText');
  }

  public performSearch(): void {
    const searchQuery: EtdSearchQuery = {
      title: this.searchText.value,
      type: undefined,
      subject: undefined,
      author: undefined,
      department: undefined,
      degreeGrantor: undefined,
      publisher: undefined,
      pageNumber: 0
    };

    this.searchService.initiateSearch(searchQuery);
  }

  /**
   * Returns true if the search input is empty.
   */
  public searchQueryEmpty(): boolean {
    return this.searchText.value === '';
  }
}
