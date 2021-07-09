import { Modal, Input, Form, Button, message } from "antd"
import React, { useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
import "../../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"

function ChangePasswordModal(props: {
  visible: boolean
  setVisible: any
  setPasswordVisible: any
}) {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const { visible, setVisible, setPasswordVisible } = props
  //   const dispatch = useDispatch()

  useEffect(() => {}, [])

  const handleCancel = () => {
    setVisible(false)
  }

  // re authetication user
  const reAutheticate = (userProvidedPassword: string) => {
    setConfirmLoading(true)

    const user = firebase.auth().currentUser
    if (user) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email as string,
        userProvidedPassword
      )
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          // User re-authenticated.
          handleCancel()
          setPasswordVisible(true)
        })
        .catch((error: any) => {
          //   console.log(error.message)
          message.error(error.message, 3)
        })
      setTimeout(() => {
        setConfirmLoading(false)
      }, 1000)
    }
  }

  const onFinish = async (credential: any) => {
    try {
      reAutheticate(credential.password)
    } catch (e) {
      // console.log(e)
      message.error(e.message, 3)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <>
      <Modal
        maskClosable={false}
        title="Please enter your Credential"
        visible={visible}
        onCancel={handleCancel}
        footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" }
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
