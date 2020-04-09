import React, { useState } from 'react';
import { HeroInfo } from '../communication/store/heroes/types';
import { Card, Avatar, Tabs, Tag, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

type PropsFromParent = {
    hero?: HeroInfo
};

type Props = PropsFromParent;

const HeroDetail = React.memo((props: Props) => {
    const { hero } = props;
    const [activeKey, setActiveKey] = useState<string>('comics');

    return (
        <Card
            bordered={false}
        >
            <Row>
                <Meta
                    avatar={<Avatar size={100} src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`} />}
                    title={hero?.name}
                    description={hero?.description || 'No hero description'}
                />
            </Row>
            <Row>
                <Tabs defaultActiveKey="comics" onChange={setActiveKey}>
                    <Tabs.TabPane tab="Comics" key="comics">
                        {activeKey === 'comics' &&
                            hero?.comics.items.map((comic, index) =>
                                <Tag key={`comic-${index}`} color="blue">{comic.name}</Tag>)
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Series" key="series">
                        {activeKey === 'series' &&
                            hero?.series.items.map((serie, index) =>
                                <Tag key={`comic-${index}`} color="cyan">{serie.name}</Tag>)
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Stories" key="stories">
                        {activeKey === 'stories' &&
                            hero?.stories.items.map((story, index) =>
                                <Tag key={`comic-${index}`} color="geekblue">{story.name}</Tag>)
                        }
                    </Tabs.TabPane>
                </Tabs>
            </Row>
        </Card>);

});

export default HeroDetail;