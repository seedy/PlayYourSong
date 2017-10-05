import {ResultItem} from './resultItem';
export class Result {

  constructor(
    public etag: string,
    public kind: string,
    public query: string,
    public regionCode: string,
    public pageInfo: {resultsPerPage: number, totalResults: number},
    public items: [ResultItem],
    public nextPageToken?: string,
    public prevPageToken?: string
) {};


}
