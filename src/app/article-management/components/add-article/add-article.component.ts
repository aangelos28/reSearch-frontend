import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {HttpClient} from '@angular/common/http';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';
import {EtdEntryMeta} from '../../../shared/model/etd-model';
import {Router} from '@angular/router';

interface ArticleType {
  name: string;
}

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  public addArticleForm: FormGroup;

  private selectedDocument: File;

  public readonly ARTICLE_TYPES: ArticleType[] = [
    {name: 'Dissertation'},
    {name: 'Thesis'}
  ];
  readonly SEPARATOR_KEY_CODES: number[] = [ENTER, COMMA];

  constructor(private httpClient: HttpClient, private router: Router, private workTracker: WorkTrackerService) {
  }

  ngOnInit(): void {
    this.addArticleForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      author: new FormControl('', [
        Validators.required
      ]),
      advisors: new FormControl([]),
      publisher: new FormControl('', [
        Validators.required
      ]),
      department: new FormControl('', [
        Validators.required
      ]),
      type: new FormControl('', [
        Validators.required
      ]),
      degreeName: new FormControl('', [
        Validators.required
      ]),
      subjects: new FormControl([]),
      abstract: new FormControl('', [
        Validators.required
      ]),
      documentFileName: new FormControl('', [
        Validators.required
      ])
    });
  }

  get titleField(): AbstractControl {
    return this.addArticleForm.get('title');
  }

  get authorField(): AbstractControl {
    return this.addArticleForm.get('author');
  }

  get advisorsField(): AbstractControl {
    return this.addArticleForm.get('advisors');
  }

  get publisherField(): AbstractControl {
    return this.addArticleForm.get('publisher');
  }

  get departmentField(): AbstractControl {
    return this.addArticleForm.get('department');
  }

  get typeField(): AbstractControl {
    return this.addArticleForm.get('type');
  }

  get degreeNameField(): AbstractControl {
    return this.addArticleForm.get('degreeName');
  }

  get subjectsField(): AbstractControl {
    return this.addArticleForm.get('subjects');
  }

  get abstractField(): AbstractControl {
    return this.addArticleForm.get('abstract');
  }

  get documentFileNameField(): AbstractControl {
    return this.addArticleForm.get('documentFileName');
  }

  public addSubject(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add subject to subjects list
    if ((value || '').trim()) {
      this.subjectsField.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public removeSubject(subject: string): void {
    const index = this.subjectsField.value.indexOf(subject);

    if (index >= 0) {
      this.subjectsField.value.splice(index, 1);
    }
  }

  public addAdvisor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add subject to subjects list
    if ((value || '').trim()) {
      this.advisorsField.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public removeAdvisor(advisor: string): void {
    const index = this.advisorsField.value.indexOf(advisor);

    if (index >= 0) {
      this.advisorsField.value.splice(index, 1);
    }
  }

  public onFileSelected(event): void {
    const file: File = event.target.files[0];

    if (file) {
      this.documentFileNameField.setValue(file.name);
      this.selectedDocument = file;
    }
  }

  public addArticle(): void {
    const articleMetadata: EtdEntryMeta = {
      title: this.titleField.value,
      contributor_author: this.authorField.value,
      contributor_committeemember: this.advisorsField.value,
      publisher: this.publisherField.value,
      contributor_department: this.departmentField.value,
      type: this.typeField.value,
      degree_name: this.degreeNameField.value,
      subject: this.subjectsField.value,
      description_abstract: this.abstractField.value
    };

    if (articleMetadata.type === 'dissertation') {
      articleMetadata.degree_level = 'PhD';
    } else if (articleMetadata.type === 'thesis') {
      articleMetadata.degree_level = 'Masters';
    }

    // Upload to backend
    this.workTracker.startWork();
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(articleMetadata)], {type: 'application/json'}));
    formData.append('etdDocument', this.selectedDocument);

    this.httpClient.post('/private/etd/create', formData).subscribe(() => {
      this.workTracker.finishWork();
      this.router.navigate(['my-articles']);
    });
  }
}
