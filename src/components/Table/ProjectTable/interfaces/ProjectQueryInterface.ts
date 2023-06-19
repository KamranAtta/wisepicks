interface Query {
  page: number;
  pageSize: number;
  searchQuery?: string;
}
export interface ProjectQuery {
  query: Query;
  status: string;
}
