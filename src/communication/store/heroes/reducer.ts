import { Reducer } from "redux";
import { HeroListState, HeroListActionTypes, HeroesList, HeroInfo } from "./types";

export const initialState: HeroListState = {
  error: null,
  loading: false,
  updating: false
};

const reducer: Reducer<HeroListState> = (state = initialState, action) => {
  switch (action.type) {
    case HeroListActionTypes.FETCH_HERO_LIST_REQUEST: {
      return { ...state, loading: true, list: undefined };
    }
    case HeroListActionTypes.FETCH_HERO_LIST_REQUEST_SUCCESS: {
      return { ...state, loading: false, list: action.payload };
    }
    case HeroListActionTypes.FETCH_HERO_LIST_REQUEST_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case HeroListActionTypes.UPDATE_HERO_LIST_REQUEST: {
      return { ...state, updating: true, error: null };
    }
    case HeroListActionTypes.UPDATE_HERO_LIST_REQUEST_SUCCESS: {
      return { ...state, updating: false,  list: { 
          ...state.list as HeroesList, 
          results: state.list?.results.map(hero => 
            hero.id === action.payload.id ? action.payload : hero) as HeroInfo[] } };
    }
    case HeroListActionTypes.UPDATE_HERO_LIST_REQUEST_ERROR: {
      return { ...state, updating: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as heroListReducer };
