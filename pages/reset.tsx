import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Reset = () => {
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
        name="username"
    rules={[{ required: true, message: 'Please input your Username!' }]}
    >
    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
    <Button type="primary" htmlType="submit" className="login-form-button">
        Confirm
    </Button>
    </Form.Item>
    </Form>
    </>
);
};

export default Reset