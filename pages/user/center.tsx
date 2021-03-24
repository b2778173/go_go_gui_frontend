import React from 'react';
import styled from 'styled-components';
import { Avatar,Tabs,Col,Row,Card ,Form, Input,Upload, Button  } from 'antd';
const { TabPane } = Tabs;
import { UserOutlined, FieldTimeOutlined, CalendarOutlined,BarChartOutlined,LineChartOutlined,UploadOutlined  } from '@ant-design/icons';

function callback(key) {
    console.log(key);
}
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const fileList = [
    {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-2',
        name: 'yyy.png',
        status: 'error',
    },
];
const Center = () =>{

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const sendEmail = async () =>{
        const res = await fetch('http://127.0.0.1:5000/message')
        const email = await res.json()

    }

    return (
        <>
            <div className="container">
                <Avatar shape="square" size={200} icon={<UserOutlined />} gap={6} />
                <div className="info">
                    <p className="acc">frgerg123</p>
                    <FieldTimeOutlined style={{ margin: '16px', color: '#08c' }} /> Online
                    <CalendarOutlined style={{ margin: '16px', color: '#08c' }} /> Joined 5 mins ago
                    <div className="list">
                        <div className="wrap">
                        <p>0 <BarChartOutlined style={{ color: '#08c' }} /></p>
                        <p>Reputation</p>
                        </div>
                        <div className="wrap">
                            <p>0 <LineChartOutlined style={{ color: '#08c' }} /></p>
                            <p>IDEAS</p>
                        </div>
                        <div className="wrap">
                            <p>0 <LineChartOutlined style={{ color: '#08c' }} /></p>
                            <p>SCRIPT</p>
                        </div>
                        <div className="wrap">
                            <p>0 <LineChartOutlined style={{ color: '#08c' }} /></p>
                            <p>LIKES</p>
                        </div>
                        <div className="wrap">
                            <p>0 <LineChartOutlined style={{ color: '#08c' }} /></p>
                            <p>FOLLOWERS</p>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Col span={2}/>
            <Tabs defaultActiveKey="5" onChange={callback} size="large" tabBarGutter={100} style={{ width: '100%',marginLeft: '2rem' }}>
                <TabPane tab="IDEAS" key="1">

                </TabPane>
                <TabPane tab="SCRIPT" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="FOLLOWERS" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="FOLLOWING" key="4">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="SETTING" key="5">
                    <Tabs defaultActiveKey="6" onChange={callback} size="large" tabBarGutter={100} style={{ width: '100%' }}>
                        <TabPane tab="Profile" key="6" style={{ display:'flex' }}>
                            <Card title="public info"  style={{ width: '30%', margin:'0 2rem'}}>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        
                                        label="Avatar"
                                        name="avatar"
                                    >
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture"
                                            defaultFileList={[...fileList]}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        
                                        label="Signature"
                                        name="signature"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                            <Card title="private details" style={{ width: '30%',margin:'0 2rem' }}>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}

                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Button>Change Eamil</Button>
                                    </Form.Item>
                                    <Form.Item
                                        
                                        label="Change Password"
                                        name="changePwd"
                                    >
                                        <Button>Change Password</Button>
                                    </Form.Item>
                                    <Form.Item
                                        
                                        label="Secure"
                                        name="secure"
                                    >
                                        <Button>Set 2-factor authentication</Button>
                                    </Form.Item>
                                    <Form.Item
                                        label="First Name"
                                        name="fName"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lName"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                    >
                                        <Input />
                                        <Button>Add</Button>

                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </TabPane>
                        <TabPane tab="Account & Billing" key="7" >
                        </TabPane>
                        <TabPane tab="Notification" key="8" >
                        </TabPane>
                        <TabPane tab="Security" key="9" >
                        </TabPane>
                    </Tabs>
                </TabPane>
            </Tabs>
            </Row>
            <style jsx>{`
                .container{
                  display: flex;
                  border: 1px solid #eee;
                  width: 100%;
                  //justify-content: center;
                  padding: 3rem;
                }
                .wrap{
                   margin-right: 50px;
                   margin-top: 20px;
                }
                .list{
                     display:flex;
                    text-align: left;
                }
                .acc{ 
                    font-size: 2rem;
                    margin-bottom: 10px;
                    
                }
                .info{
                margin: 0 2rem;
                }
            `}</style>

        </>
    )


}


// export async function getServerSideProps(context) {
//     const res = await fetch("https://randomuser.me/api/");
//     const userData = await res.json();
//     return {
//         props: { userData:userData.results[0]},
//     };
// }

export default Center