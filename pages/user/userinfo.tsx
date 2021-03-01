import React, {useState} from 'react';
// import './index.css';
import { Typography, Image, Row, Col, Avatar, Button, Space, Divider, List, Skeleton, Tabs } from 'antd';
const { Text, Title, Paragraph } = Typography;

import { UserOutlined } from '@ant-design/icons';
import {useRouter} from "next/router";
import App from '../_app';
import {use} from "ast-types";


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/`;
const { TabPane } = Tabs;



class ProfileImg extends React.Component<any, any>{

    state = {
        initLoading: true,
        loading: false,
        data: [],
        userInfo: [],
        name: {
            first: null,
            last: null
        },
        location: {
            city: null,
            country: null,
            state: null,
            postcode: null
        },
        email: '',
        picture: {
            large: null
        },
    };

    componentDidMount() {

        // Mock User Info Api from https://randomuser.me/
        fetch(fakeDataUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(async res => {
            let response = {
                results:[]
            };

            response = await res.json();

           let userInfo = response.results[0];

            this.setState({
                initLoading: false,
                data: response.results,
                userInfo: userInfo,
                name: userInfo.name,
                location: userInfo.location,
                email: userInfo.email,
                picture: userInfo.picture,
            });
        });
    }

    render() {

        const { initLoading, loading, userInfo, name, location, email, picture } = this.state;


        return (


                <>
                    <Row>
                        <Col span={4}/>
                        <Col span={20}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="General" key="1">
                                    <Row>
                                        <Space direction="vertical">
                                            <div>
                                                <Avatar src={picture.large} size={120} icon={<UserOutlined />} />
                                            </div>
                                            <Button>Upload Photo</Button>
                                        </Space>
                                    </Row>
                                    <Divider orientation="left" plain><Title level={5}>Personal Info</Title></Divider>
                                    <Row>
                                        <Space direction="vertical">
                                            <div>
                                                <Row><Title level={5}><Text type="secondary">Name</Text></Title></Row>
                                                <Row>
                                                    {name.first} {name.last}
                                                </Row>
                                            </div>
                                            <div>
                                                <Row><Title level={5}><Text type="secondary">Email</Text></Title></Row>
                                                <Row>
                                                    <Paragraph editable={{ onChange: email => {this.setState({email:email})} }}>{email}</Paragraph>
                                                </Row>
                                            </div>
                                            <div>
                                                <Row><Title level={5}><Text type="secondary">Location</Text></Title></Row>
                                                {/*<Row><Text type="secondary">street</Text></Row>*/}
                                                {/*<Row>{location.street}</Row>*/}

                                                <Row><Text type="secondary">city</Text></Row>
                                                <Row>{location.city}</Row>

                                                <Row><Text type="secondary">country</Text></Row>
                                                <Row>{location.country}</Row>

                                                <Row><Text type="secondary">state</Text></Row>
                                                <Row>{location.state}</Row>

                                                <Row><Text type="secondary">postcode</Text></Row>
                                                <Row>{location.postcode}</Row>
                                            </div>
                                        </Space>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Password" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab="Connected Account" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </>
            );
    }
}




export default ProfileImg


