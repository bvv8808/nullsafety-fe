export interface IFetchParamsForContents {
  category: string;
  offset: number;
  limit: number;
}

export interface IFetchParamsToWrite {
  cid?: number;
  title: string;
  content: string;
  category: string;
}
