import { action } from "typesafe-actions";
import { HeroListActionTypes, HeroListParam, HeroInfo } from "./types";

export const fetchHeroListRequest = (heroListParam: HeroListParam) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST, heroListParam);

export const fetchHeroListSuccess = (documentList: Document[]) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST_SUCCESS, documentList);

export const fetchHeroListError = (message: string) =>
  action(HeroListActionTypes.FETCH_HERO_LIST_REQUEST_ERROR, message);

export const updateHeroRequest = (heroInfo: HeroInfo) =>
  action(HeroListActionTypes.UPDATE_HERO_LIST_REQUEST, heroInfo);

export const updateHeroSuccess = (heroInfo: HeroInfo) =>
  action(HeroListActionTypes.UPDATE_HERO_LIST_REQUEST_SUCCESS, heroInfo);

export const updateHeroError = (message: string) =>
  action(HeroListActionTypes.UPDATE_HERO_LIST_REQUEST_ERROR, message);
