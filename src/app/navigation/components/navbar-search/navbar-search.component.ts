import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css']
})
export class NavbarSearchComponent implements OnInit {

  public searchForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('', [
        Validators.required
      ])
    });
  }

  public performSearch(): void {
  }

  /**
   * Returns true if the search input is empty.
   */
  public searchQueryEmpty(): boolean {
    return this.searchForm.get('searchQuery').value === '';
  }
}
