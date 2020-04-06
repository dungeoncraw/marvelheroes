import Axios from 'axios';
import { HeroListParam } from './types';

export default {
  fetchHeroList(params: HeroListParam) {
    return Axios.get('');
  },
};