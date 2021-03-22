import {Injectable} from '@angular/core';
import {Router, UrlSerializer, UrlTree} from '@angular/router';
import {SearchQuery} from '../../model/search-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router, private urlSerializer: UrlSerializer) {
  }

  public initiateSearch(searchQuery: SearchQuery): void  {
    if (searchQuery.title === '') {
      return;
    }

    this.router.navigate(['search-results'], this.makeQueryUrlTree(searchQuery));
  }

  public initiateAdvancedSearch(searchQuery: SearchQuery): void {
    if (this.isQueryEmpty(searchQuery)) {
      return;
    }

    this.router.navigate(['search-results'], this.makeQueryUrlTree(searchQuery));
  }

  public makeQueryUrlTree(searchQuery: SearchQuery): UrlTree {
    return this.router.createUrlTree([], {
      queryParams: {
        t: searchQuery.title,
        s: searchQuery.subject,
        a: searchQuery.author,
        d: searchQuery.department,
        dg: searchQuery.degreeGrantor,
        pb: searchQuery.publisher,
        p: searchQuery.pageNumber
      }
    });
  }

  public urlEncodeQuery(searchQuery: SearchQuery): string {
    const tree = this.makeQueryUrlTree(searchQuery);
    return this.urlSerializer.serialize(tree);
  }

  public isQueryEmpty(searchQuery: SearchQuery): boolean {
      return searchQuery.title === '' && searchQuery.subject === '' && searchQuery.author === '' && searchQuery.department === '' &&
        searchQuery.degreeGrantor === '' && searchQuery.publisher === '';
  }
}
