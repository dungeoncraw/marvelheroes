import React, { useState } from 'react';
import { HeroInfo } from '../communication/store/heroes/types';
import { Card, Avatar, Tabs, Tag, Row, Form, Input, Col, Modal, Button, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ButtonGroup from 'antd/lib/button/button-group';
import { StoreState } from '../communication/redux/store';
import { connect, useDispatch } from 'react-redux';
import { updateHeroRequest } from '../communication/store/heroes/actions';
import { usePrevious } from './hooks/custom';

type PropsFromParent = {
    hero?: HeroInfo
    visible: boolean;
    setVisible: (bool: boolean) => void;
};

type PropsFromState = {
    loading: boolean;
    error: string | null;
}

type Props = PropsFromParent & PropsFromState;

const HeroDetail = React.memo((props: Props) => {
    const { hero, visible, setVisible, loading, error } = props;
    const [activeKey, setActiveKey] = useState<string>('comics');
    const [heroForm] = Form.useForm();
    const dispatch = useDispatch();
    const prevLoading = usePrevious(loading);

    const handleVisible = () => {
        heroForm.resetFields();
        setVisible(!visible);
    };
    
    const handleUpdateHero = async () => {
        const formValues = await heroForm.validateFields();
        const updatedHero = {...hero, name: formValues.heroName, description: formValues.heroDescription} as HeroInfo;
        dispatch(updateHeroRequest(updatedHero));
    }
    React.useEffect(() => {
        if(prevLoading && !loading && !error) {
            notification.success({message: 'Hero Updated'});
            handleVisible();
        }
    }, [loading]);

    React.useLayoutEffect(() => {
        if (visible) {
            // RESET FIELDS TO OPEN AND RENDER NEW HERO
            heroForm.resetFields();
        }
    }, [visible]);

    return (
        <Modal
            title="Hero info"
            visible={visible}
            onCancel={handleVisible}
            onOk={handleVisible}
            className="hero-detail"
            okText="Ok"
            footer={[
                <ButtonGroup key="modal-actions">
                    <Button key="cancel" type="default" loading={loading} onClick={handleVisible}>
                        Cancel
                </Button>
                    <Button key="submit" type="primary" loading={loading} onClick={handleUpdateHero}>
                        Update
                </Button>
                </ButtonGroup>
            ]}
        >
            <Card
                bordered={false}
                className="hero-detail"
            >
                <Row>
                    <Col xs={24} sm={6}>
                        <Avatar size={100} src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`} />
                    </Col>
                    <Col flex="auto">
                        <Form
                            form={heroForm}
                            name="hero-detail-form"
                            initialValues={{ heroName: hero?.name, heroDescription: hero?.description }}
                        >
                            <Form.Item name="heroName" label="Name" rules={[{ required: true, message: 'Hero name is required' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="heroDescription"
                                label="Description"
                            >
                                <TextArea
                                    autoSize
                                />
                            </Form.Item>
                        </Form>
                    </Col>
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
            </Card>
        </Modal>
    );
});
const mapStateToProps = ({ heroListReducer }: StoreState) => ({
    loading: heroListReducer.updating,
    error: heroListReducer.error
});

export default connect(mapStateToProps)(HeroDetail);