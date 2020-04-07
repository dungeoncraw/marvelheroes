import { HeroListParam } from './types';
import api from '../../api/api';

export default {
  fetchHeroList(params: HeroListParam) {
    return api.getWithParms('/characters', params);
  },
  fetchHeroDetail(heroId: number) {
    return api.get(`/characters/${heroId}`);
  },
  fetchHeroComics(heroId: number) {
    return api.get(`/characters/${heroId}/comics`);
  },
  fetchHeroEvents(heroId: number) {
    return api.get(`/characters/${heroId}/events`);
  },
  fetchHeroSeries(heroId: number) {
    return api.get(`/characters/${heroId}/series`);
  },
  fetchHeroStories(heroId: number) {
    return api.get(`/characters/${heroId}/stories`);
  }
};