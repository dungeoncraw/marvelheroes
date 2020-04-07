import { Reducer } from 'redux';
import { HeroListState, HeroListActionTypes } from './types';

export const initialState: HeroListState = {
    error: null,
    loading: false,
    list: []
};

const reducer: Reducer<HeroListState> = (state = initialState, action) => {
    switch (action.type) {
        case HeroListActionTypes.FETCH_HERO_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case HeroListActionTypes.FETCH_HERO_LIST_REQUEST_SUCCESS: {
            return { ...state, loading: false, list: action.payload };
        }
        case HeroListActionTypes.FETCH_HERO_LIST_REQUEST_ERROR: {
            return { ...state, loading: false, error: action.payload };
        }
        default: {
            return state;
        }
    }
};

export { reducer as heroListReducer };