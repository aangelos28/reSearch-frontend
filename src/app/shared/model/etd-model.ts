export interface EtdSearchQuery {
  title: string;
  type: string;
  subject: string;
  author: string;
  department: string;
  degreeGrantor: string;
  publisher: string;
  pageNumber: number;
}

export interface EtdEntryMeta {
  id?: number;
  handle?: number;
  title?: string;
  description_abstract?: string;
  type?: string;
  subject?: [string];
  contributor_author?: string;
  contributor_committeechair?: [string];
  contributor_committeecochair?: [string];
  contributor_committeemember?: [string];
  contributor_department?: string;
  date_accessioned?: Date;
  date_available?: Date;
  date_issued?: Date;
  degree_grantor?: string;
  degree_level?: string;
  degree_name?: string;
  identifier_sourceurl?: string;
  identifier_uri?: string;
  publisher?: string;
  rights?: string;
}

export interface EtdSearchResults {
  totalPages: number;
  resultsPerPage: number;
  totalResultsInPages: number;
  pageResults: [EtdEntryMeta];
}

export interface EtdClaimComment {
  id?: number;
  authorId?: number;
  authorName?: string;
  claim: string;
  reproducible: number;
  proofSourceCodeUrl?: string;
  proofDatasetUrl?: string;
  results: string;
  createdAt?: Date;
}
