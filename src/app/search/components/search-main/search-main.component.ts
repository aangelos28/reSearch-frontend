import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EtdSearchQuery} from '../../../shared/model/etd-model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SearchAdvancedComponent} from '../search-advanced/search-advanced.component';
import {SearchService} from '../../services/search/search.service';
import {SpeechRecognitionService} from '../../../speech-recognition/services/speech-recognition/speech-recognition.service';
import {SpeechRecognitionDialogComponent} from '../../../speech-recognition/components/speech-recognition-dialog/speech-recognition-dialog.component';
import {BrowserInfoService} from '../../../shared/services/browser-info/browser-info.service';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css'],
})
export class SearchMainComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private searchService: SearchService, private speechRecognitionService: SpeechRecognitionService,
              public browserInfoService: BrowserInfoService, private dialog: MatDialog) {
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

  /**
   * Opens the speech recognition dialog.
   */
  public openSpeechRecognitionDialog(): void {
    const speechRecognitionDialog: MatDialogRef<SpeechRecognitionDialogComponent> = this.dialog.open(SpeechRecognitionDialogComponent);
    speechRecognitionDialog.afterClosed().subscribe(result => {
      if (result) {
        this.searchText.setValue(result);
        this.performSearch();
      }
    });
  }
}
