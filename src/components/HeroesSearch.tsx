import React, { useState, useRef } from 'react';
import { fetchHeroListRequest } from '../communication/store/heroes/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { StoreState } from '../communication/redux/store';
import { HeroListParam, HeroesList, HeroInfo } from '../communication/store/heroes/types';
import { OrderByEnum } from '../constants/enums';
import {
    Row, Col, Card, Button, Pagination, Skeleton, Modal, Input,
    Checkbox, Select, Result
} from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { useVisible } from './hooks/custom';
import { debounce } from 'lodash';

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
    const defaultSearch = { limit: 12, offset: 1, orderBy: OrderByEnum.NAME_ASC }
    const [search, updateSearch] = useState<HeroListParam>(defaultSearch);

    const [hero, setHero] = useState<HeroInfo | undefined>();
    const [exactlySearch, setExactlySearch] = useState<boolean>(false);
    const dispatch = useDispatch();
    const visibility = useVisible(false);

    const updatePagination = (offsetPag: number, limitPag?: number) => {
        updateSearch({ ...search, offset: offsetPag, limit: limitPag || 10 });
    };
    const debounceName = useRef(debounce(
        (heroName: string) =>
            exactlySearch ?
            updateSearch({ ...search, name: heroName, nameStartsWith: undefined }) :
            updateSearch({ ...search, nameStartsWith: heroName, name: undefined }),
        500
    )).current;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        debounceName(e.target?.value);

    const clearSearch = () => updateSearch(defaultSearch);
    const handleExactly = () => {
        setExactlySearch(!exactlySearch);
    };
    const handleHeroSelect = (heroData: HeroInfo) => () => {
        setHero(heroData);
        visibility.onClick();
    }
    React.useEffect(() => {
        dispatch(fetchHeroListRequest({ ...search, offset: (search.offset - 1) * search.limit }));
    }, [search, dispatch]);
    
    React.useEffect(() => {
        exactlySearch ?
        updateSearch({ ...search, name: search.nameStartsWith, nameStartsWith: undefined }) :
        updateSearch({ ...search, nameStartsWith: search.name, name: undefined })
    }, [exactlySearch]);

    return (
        <div className="heroes">
            <Row gutter={[12, 16]} className="bordered-search">
                <Col span={3}>
                    <Title level={4}>Hero name</Title>
                </Col>
                <Col span={15}>
                    <Input
                        placeholder="Search hero name"
                        allowClear
                        onChange={handleNameChange}
                        addonAfter={
                            <Checkbox checked={exactlySearch} onChange={handleExactly}>Exactly</Checkbox>
                        } />
                </Col>
                <Col span={5}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Order by"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Select.Option value={OrderByEnum.NAME_ASC}>
                            <SortAscendingOutlined /> Hero name ascending
                        </Select.Option>
                        <Select.Option value={OrderByEnum.NAME_DESC}>
                            <SortDescendingOutlined /> Hero name descending
                        </Select.Option>
                        <Select.Option value={OrderByEnum.MODIFIED_ASC}>
                            <SortAscendingOutlined /> Modified date ascending
                        </Select.Option>
                        <Select.Option value={OrderByEnum.MODIFIED_DESC}>
                            <SortDescendingOutlined /> Modified date descending
                        </Select.Option>
                    </Select>
                </Col>
            </Row>
            <div className="hero-list">
                <Row gutter={[16, 24]} justify="center">
                    {loading &&
                        <Col span={6}>
                            <Card
                                loading={loading}
                                actions={[
                                    <Button type="primary" block> View More</Button>
                                ]}
                            >
                                <Skeleton avatar active />
                            </Card>
                        </Col>
                    }
                    {heroList?.results?.map((hero: HeroInfo, key: number) => (
                        <Col span={6} key={`col-${key}`}>
                            <Card
                                className="hero-card"
                                key={`card-${key}`}
                                loading={loading}
                                cover={<img alt={hero.name} src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />}
                                actions={[
                                    <Button
                                        type="primary"
                                        className="default-btn"
                                        block
                                        loading={loading}
                                        onClick={handleHeroSelect(hero)}
                                    >
                                        View More
                                    </Button>
                                ]}
                            >
                                <Title level={4} ellipsis>{hero.name}</Title>
                            </Card>
                        </Col>
                    ))}
                    {!loading && !heroList?.results?.length &&
                        <Result
                            status="warning"
                            title="No hero found using provided parameters. Try again."
                            extra={
                                <Button type="primary" key="console" onClick={clearSearch}>
                                    Clear
                        </Button>
                            }
                        />}
                </Row>
                <Modal
                    visible={visibility.value}
                    onCancel={visibility.onClick}
                    onOk={visibility.onClick}
                    className="hero-detail"
                    okText="Ok"
                >
                    <span>{hero?.name}</span>
                </Modal>
                {heroList?.results?.length &&
                    <Pagination
                        className="hero-pagination"
                        total={heroList.total}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={search.limit}
                        defaultCurrent={search.offset}
                        onChange={updatePagination}
                    />}
            </div>
        </div>)
});

const mapStateToProps = ({ heroListReducer }: StoreState) => ({
    heroList: heroListReducer.list,
    loading: heroListReducer.loading
});

export default withRouter(connect(mapStateToProps)(HeroesSearch));