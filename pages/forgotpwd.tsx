import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Chart from '../components/chart'
import styled from 'styled-components'
import Router from 'next/Router'

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const Code = styled.div`
    width: 100px;
    height: 50px;
    border: 1px solid #000;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `
const Forgotpwd = () => {
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Chart></Chart>
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
            <Input />
          </Form.Item>

          <Form.Item
              label="Verify"
              name="verify"
              rules={[{ required: true, message: 'Please input code!' }]}
          >
            <Input />
          </Form.Item>
            <Code>agtg35kf</Code>

          <Form.Item {...tailLayout}>
            <Button onClick={()=>{Router.push('./verifyID')}} type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default Forgotpwd