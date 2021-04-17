import {Injectable} from '@angular/core';
import {Router, UrlSerializer, UrlTree} from '@angular/router';
import {EtdSearchQuery} from '../../model/etd-model';
import {NavbarSearchService} from '../../../navigation/services/navbar-search/navbar-search.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router, private urlSerializer: UrlSerializer, private navbarSearchService: NavbarSearchService) {
  }

  public initiateSearch(searchQuery: EtdSearchQuery): void {
    if (this.isQueryEmpty(searchQuery)) {
      return;
    }

    this.navbarSearchService.setQuery(searchQuery.title);

    this.router.navigate(['search-results'], this.makeQueryUrlTree(searchQuery));
  }

  public makeQueryUrlTree(searchQuery: EtdSearchQuery): UrlTree {
    return this.router.createUrlTree([], {
      queryParams: {
        t: searchQuery.title,
        tp: searchQuery.type,
        s: searchQuery.subject,
        a: searchQuery.author,
        d: searchQuery.department,
        dg: searchQuery.degreeGrantor,
        pb: searchQuery.publisher,
        p: searchQuery.pageNumber
      }
    });
  }

  public urlEncodeQuery(searchQuery: EtdSearchQuery): string {
    const tree = this.makeQueryUrlTree(searchQuery);
    return this.urlSerializer.serialize(tree);
  }

  public isQueryEmpty(searchQuery: EtdSearchQuery): boolean {
      return searchQuery.title === '' && searchQuery.subject === '' && searchQuery.author === '' && searchQuery.department === '' &&
        searchQuery.degreeGrantor === '' && searchQuery.publisher === '';
  }
}
