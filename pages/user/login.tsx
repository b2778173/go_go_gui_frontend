import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from '../../styles/Home.module.scss'
import React, {useState} from "react";
import axios from "axios";
import Router from "next/router";
import FacebookLogin from 'react-facebook-login';
import {Url} from "../../constant/urlConstant";

export default function login() {
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const user = {
            "username": values.username,
            "password": values.password
        }
        await axios.post(Url.LOCAL + '/auth', user).then(res => {
            console.log('res', res)
            localStorage.setItem("token", res.data.access_token);
            Router.push('/');
        });
    };

    const [accessToken, setAccessToken] = useState("")
    const componentClicked = (data: object) => {
        console.log(data)
    }
    const responseFacebook = (response: any) => {
        console.log(response);
        console.log(accessToken)
        setAccessToken(response.accessToken)
    }

    return (
        <Form
            name="normal_login"
            className={styles.container}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href={"/user/register"}>register now!</a>
            </Form.Item>

            <FacebookLogin
                appId="479394116407879"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}/>,
        </Form>
    );
};

// login.getInitialProps = async () => {
//     try {
//         const res = await axios.get('http://localhost:5000/auth');
//         const restaurants = res.data;
//         console.log('res', res)
//         console.log('restaurants', restaurants)
//         return {restaurants};
//     } catch (error) {
//         return {error};
//     }
// };
