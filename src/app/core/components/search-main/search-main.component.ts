import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css'],
})
export class SearchMainComponent implements OnInit {

  public searchForm: FormGroup;

  constructor() {
    // TODO
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('', [
        Validators.required
      ])
    });
  }

  public performSearch(): void {
    // TODO
  }

  /**
   * Returns true if the search input is empty.
   */
  public searchQueryEmpty(): boolean {
    return this.searchForm.get('searchQuery').value === '';
  }
}
