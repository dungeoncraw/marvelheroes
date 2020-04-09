import { HeroListParam } from './types';
import api from '../../api/api';

export default {
  fetchHeroList(params: HeroListParam) {
    return api.getWithParms('/characters', params);
  },
};