import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {SearchService} from '../../../shared/services/search/search.service';
import {EtdSearchQuery} from '../../../shared/model/etd-model';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-advanced',
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.css']
})
export class SearchAdvancedComponent implements OnInit {

  public advancedSearchForm: FormGroup;

  constructor(private searchService: SearchService, public dialogRef: MatDialogRef<SearchAdvancedComponent>) {
  }

  ngOnInit(): void {
    this.advancedSearchForm = new FormGroup({
      title: new FormControl(''),
      type: new FormControl(''),
      subject: new FormControl(''),
      author: new FormControl(''),
      department: new FormControl(''),
      degreeGrantor: new FormControl(''),
      publisher: new FormControl('')
    });
  }

  get title(): AbstractControl {
    return this.advancedSearchForm.get('title');
  }
  get type(): AbstractControl {
    return this.advancedSearchForm.get('type');
  }
  get subject(): AbstractControl {
    return this.advancedSearchForm.get('subject');
  }
  get author(): AbstractControl {
    return this.advancedSearchForm.get('author');
  }
  get department(): AbstractControl {
    return this.advancedSearchForm.get('department');
  }
  get degreeGrantor(): AbstractControl {
    return this.advancedSearchForm.get('degreeGrantor');
  }
  get publisher(): AbstractControl {
    return this.advancedSearchForm.get('publisher');
  }

  public performSearch(): void {
    const searchQuery: EtdSearchQuery = {
      title: undefined,
      type: undefined,
      subject: undefined,
      author: undefined,
      department: undefined,
      degreeGrantor: undefined,
      publisher: undefined,
      pageNumber: 0
    };

    if (this.title.value !== '') {
      searchQuery.title = this.title.value.replace(/<[^>]*>/g, '');
    }
    if (this.type.value !== '') {
      searchQuery.type = this.type.value;
    }
    if (this.subject.value !== '') {
      searchQuery.subject = this.subject.value;
    }
    if (this.author.value !== '') {
      searchQuery.author = this.author.value;
    }
    if (this.department.value !== '') {
      searchQuery.department = this.department.value;
    }
    if (this.degreeGrantor.value !== '') {
      searchQuery.degreeGrantor = this.degreeGrantor.value;
    }
    if (this.publisher.value !== '') {
      searchQuery.publisher = this.publisher.value;
    }

    this.searchService.initiateSearch(searchQuery);

    this.dialogRef.close();
  }
}
