import { OrderByEnum } from "../../../constants/enums";

export enum HeroListActionTypes {
  FETCH_HERO_LIST_REQUEST = "@@heroList/FETCH_HERO_LIST_REQUEST",
  FETCH_HERO_LIST_REQUEST_SUCCESS = "@@heroList/FETCH_HERO_LIST_REQUEST_SUCCESS",
  FETCH_HERO_LIST_REQUEST_ERROR = "@@heroList/FETCH_HERO_LIST_REQUEST_ERROR",
}
export interface HeroListParam {
  limit: number;
  offset: number;
  orderBy: OrderByEnum;
  nameStartsWith?: string;
  name?: string;
}

export type HeroResource = {
  available: number;
  returned: number;
  collectionURI: string;
  items: [
    {
      resourceURI: string;
      name: string;
    }
  ];
};
export type HeroesInfo = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: [
    {
      type: string;
      url: string;
    }
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: HeroResource;
  stories: HeroResource;
  events: HeroResource;
  series: HeroResource;
};
export interface HeroesList {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: HeroesInfo[];
}

export interface HeroListState {
  readonly loading: boolean;
  readonly list?: HeroesList;
  readonly error: string | null;
}
