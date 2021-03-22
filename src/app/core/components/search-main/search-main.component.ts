import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../../shared/services/search/search.service';
import {SearchQuery} from '../../../shared/model/search-model';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css'],
})
export class SearchMainComponent implements OnInit {

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
    const searchQuery: SearchQuery = {
      title: this.searchText.value,
      subject: '',
      author: '',
      department: '',
      degreeGrantor: '',
      publisher: '',
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
