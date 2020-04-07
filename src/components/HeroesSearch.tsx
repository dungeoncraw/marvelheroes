import React, { useState } from 'react';
import { fetchHeroListRequest } from '../communication/store/heroes/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { StoreState } from '../communication/redux/store';
import { HeroListParam, HeroesList, HeroesInfo } from '../communication/store/heroes/types';
import { OrderByEnum } from '../constants/enums';
import { Row, Col, Card, Button, Pagination, Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';

type PropsFromDispatch = {
    fetchHeroListRequest: typeof fetchHeroListRequest
};

type PropsFromState = {
    heroList?: HeroesList;
    loading: boolean;
};

type Props = PropsFromDispatch & PropsFromState & RouteComponentProps<{}>;

const HeroesSearch = React.memo((props: Props) => {
    const { heroList, loading } = props;
    const [search, updateSearch] = useState<HeroListParam>({ limit: 12, offset: 1, orderBy: OrderByEnum.NAME_ASC });
    const dispatch = useDispatch();
    const updatePagination = (offsetPag: number, limitPag?: number) => {
        updateSearch({ ...search, offset: (offsetPag - 1) * (limitPag || 1), limit: limitPag || 10 });
    };
    React.useEffect(() => {
        dispatch(fetchHeroListRequest(search));
        updateSearch(search)
    }, [search, dispatch]);
    return (
        <div className="hero-list">
            <Row gutter={[16, 24]}>
                {loading &&
                    <Col span={8}>
                        <Card
                            loading={loading}
                            actions={[
                                <Button type="primary" block> View More</Button>
                            ]}
                        >
                            <Skeleton avatar active/>
                        </Card>
                    </Col>
                }
                {heroList?.results?.map((hero: HeroesInfo, key: number) => (
                    <Col span={8} key={`col-${key}`}>
                        <Card
                            className="hero-card"
                            key={`card-${key}`}
                            loading={loading}
                            cover={<img alt={hero.name} src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />}
                            actions={[
                                <Button type="primary" block loading={loading}> View More</Button>
                            ]}
                        >
                            <Title level={4}>{hero.name}</Title>
                        </Card>
                    </Col>
                ))}
            </Row>
            {heroList?.results.length &&
                <Pagination
                    className="hero-pagination"
                    total={heroList.total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    pageSize={search.limit}
                    defaultCurrent={search.offset}
                    onChange={updatePagination}
                />}
        </div>)
});

const mapStateToProps = ({ heroListReducer }: StoreState) => ({
    heroList: heroListReducer.list,
    loading: heroListReducer.loading
});

export default withRouter(connect(mapStateToProps)(HeroesSearch));