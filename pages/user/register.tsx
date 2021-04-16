/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Form, Input, Tooltip, Select, Row, Col, Checkbox, Button } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import axios from "axios"
import Router from "next/router"
import styles from "../../styles/Home.module.scss"
// import { Url } from "../../constant/urlConstant"

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

interface RegisterUser {
  [key: string]: string | number
}

export default function Register() {
  const [form] = Form.useForm()

  const onFinish = async (values: RegisterUser) => {
    console.log("Received values of form: ", values)
    const { email } = values
    const username =
      typeof email === "string" ? email.slice(0, email.indexOf("@")) : null
    const userInfo = {
      username,
      password: values.password,
      name: values.name,
      email,
      address: values.address,
      social_media: {
        facebook_id: null,
        line_id: null
      },
      watchlist: [
        {
          symbol: "msft",
          memo: ""
        }
      ]
    }
  }

  return (
    <Form
      className={styles.Register}
      {...formItemLayout}
      form={form}
      name="Register"
      onFinish={onFinish}
      scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              )
            }
          })
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={["address", "city"]}
            noStyle
            rules={[{ required: true, message: "Province is required" }]}>
            <Select placeholder="Select city">
              <Option value="Tulsa">Tulsa</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["address", "zip_code"]}
            noStyle
            rules={[{ required: true, message: "zip_code is required" }]}>
            <Input style={{ width: "15%" }} placeholder="zip_code" />
          </Form.Item>

          <Form.Item
            name={["address", "street"]}
            noStyle
            rules={[{ required: true, message: "Street is required" }]}>
            <Input style={{ width: "50%" }} placeholder="Input street" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please input the captcha you got!"
                }
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement"))
          }
        ]}
        {...tailFormItemLayout}>
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
