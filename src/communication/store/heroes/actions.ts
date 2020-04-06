import { action } from 'typesafe-actions';
import { HeroListActionTypes, HeroListParam } from './types';

export const fetchHeroListRequest = (heroListParam: HeroListParam) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST, heroListParam);

export const fetchHeroListSuccess = (documentList: Document[]) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST_SUCCESS, documentList);

export const fetchHeroListError = (message: string) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST_ERROR, message);