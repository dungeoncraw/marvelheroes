import { OrderByEnum } from '../../../constants/enums';

export enum HeroListActionTypes {
    FETCH_HERO_LIST_REQUEST = '@@heroList/FETCH_HERO_LIST_REQUEST',
    FETCH_HERO_LIST_REQUEST_SUCCESS = '@@heroList/FETCH_HERO_LIST_REQUEST_SUCCESS',
    FETCH_HERO_LIST_REQUEST_ERROR = '@@heroList/FETCH_HERO_LIST_REQUEST_ERROR',
}
export interface HeroListParam {
    limit: number;
    offset: number;
    orderBy: OrderByEnum;
    nameStartsWith?: string;
    name?: string;
}

export interface HeroesList {
    code: number,
    status: string,
    copyright: string,
    attributionText: string,
    attributionHTML: string,
    data: {
      offset: number,
      limit: number,
      total: number,
      count: number,
      results: [
        {
          id: number,
          name: string,
          description: string,
          modified: Date,
          resourceURI: string,
          urls: [
            {
              type: string,
              url: string
            }
          ],
          thumbnail: {
            path: string,
            extension: string
          },
          comics: {
            available: number,
            returned: number,
            collectionURI: string,
            items: [
              {
                resourceURI: string,
                name: string
              }
            ]
          },
          stories: {
            available: number,
            returned: number,
            collectionURI: string,
            items: [
              {
                resourceURI: string,
                name: string,
                type: string
              }
            ]
          },
          events: {
            available: number,
            returned: number,
            collectionURI: string,
            items: [
              {
                resourceURI: string,
                name: string
              }
            ]
          },
          series: {
            available: number,
            returned: number,
            collectionURI: string,
            items: [
              {
                resourceURI: string,
                name: string
              }
            ]
          }
        }
      ]
    },
    etag: string
  }

export interface HeroListState {
    readonly loading: boolean;
    readonly list?: HeroesList[];
    readonly error: string | null;
  }