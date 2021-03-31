import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../../shared/services/search/search.service';
import {EtdSearchQuery} from '../../../shared/model/search-model';
import {MatDialog} from '@angular/material/dialog';
import {SearchAdvancedComponent} from '../search-advanced/search-advanced.component';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css'],
})
export class SearchMainComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private searchService: SearchService, private dialog: MatDialog) {
    // Empty
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchText: new FormControl('', [
        Validators.required
      ])
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

  /**
   * Opens the advanced search dialog.
   */
  public openAdvancedSearchDialog(): void {
    this.dialog.open(SearchAdvancedComponent);
  }
}
