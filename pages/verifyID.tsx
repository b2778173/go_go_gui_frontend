import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Verify = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
        <Form
    name="normal_login"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    >
    <Form.Item
        name="email"
    rules={[{ required: true, message: 'Please input your Email!' }]}
    >
    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
    name="password"
    rules={[{ required: true, message: 'Please input your Password!' }]}
    >
    <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
    type="password"
    placeholder="Reset Password"
        />
        </Form.Item>
        <Form.Item
    name="password"
    rules={[{ required: true, message: 'Please input your Password!' }]}
    >
    <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
    type="password"
    placeholder="Confirm Password"
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
    Or <a href="">register now!</a>
    </Form.Item>
    </Form>
    </>
);
};

export default Verify