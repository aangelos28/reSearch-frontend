import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EtdSearchQuery} from '../../../shared/model/etd-model';
import {SearchService} from '../../../shared/services/search/search.service';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css']
})
export class NavbarSearchComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private searchService: SearchService) {
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
    // Clean tags from search query
    const cleanTitle = this.searchText.value.replace(/<[^>]*>/g, '');
    this.searchText.setValue(cleanTitle);

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
