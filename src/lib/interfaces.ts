import { TContent, TContentPreview } from "./types";

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

export interface IResFullContent {
  contentData: TContent;
  prevContentPreview: TContentPreview;
  nextContentPreview: TContentPreview;
}

export interface IResPost {
  code: number;
  msg: string;
}
