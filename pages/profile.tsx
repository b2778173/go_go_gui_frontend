import { Form, Input, InputNumber, Button } from "antd"
import React from "react"

interface User {
  name: string
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
}

function Profile() {
  const onFinish = (values: User) => {
    console.log(values)
    // alert(values)
  }
  const { labelCol, wrapperCol } = layout
  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}>
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[{ type: "number", min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "website"]} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Profile
