import React from 'react';
import { fetchHeroListRequest } from '../communication/store/heroes/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../communication/redux/store';
import { AnyAction, Dispatch } from 'redux';
import { HeroListParam, HeroesList } from '../communication/store/heroes/types';

type PropsFromDispatch = {
    fetchHeroListRequest: typeof fetchHeroListRequest
};

type PropsFromState = {
    heroList?: HeroesList[];
    loading: boolean;
};

type Props = PropsFromDispatch & PropsFromState & RouteComponentProps<{}>;

const HeroesSearch = React.memo((props: Props) => {
    return (<span>a</span>)
});

const mapStateToProps = ({ heroListReducer }: StoreState) => ({ 
    heroList: heroListReducer.list,
    loading: heroListReducer.loading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    fetchHeroListRequest: (param: HeroListParam) => dispatch(fetchHeroListRequest(param)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeroesSearch));