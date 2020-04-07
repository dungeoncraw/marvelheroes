import React, { useState } from 'react';
import { fetchHeroListRequest } from '../communication/store/heroes/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { StoreState } from '../communication/redux/store';
import { HeroListParam, HeroesList } from '../communication/store/heroes/types';
import { OrderByEnum } from '../constants/enums';

type PropsFromDispatch = {
    fetchHeroListRequest: typeof fetchHeroListRequest
};

type PropsFromState = {
    heroList?: HeroesList[];
    loading: boolean;
};

type Props = PropsFromDispatch & PropsFromState & RouteComponentProps<{}>;

const HeroesSearch = React.memo((_: Props) => {
    const [search, updateSearch] = useState<HeroListParam>({limit: 10, offset: 1, orderBy: OrderByEnum.NAME_ASC});
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchHeroListRequest(search));
        updateSearch(search)
    }, [search]);
    return (<span>HeroSearch</span>)
});

const mapStateToProps = ({ heroListReducer }: StoreState) => ({ 
    heroList: heroListReducer.list,
    loading: heroListReducer.loading
});

export default withRouter(connect(mapStateToProps)(HeroesSearch));