import { Modal, Input, message } from "antd"
import React, { useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
import "../../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"

function ChangePasswordModal(props: {
  initEmail: string
  visible: boolean
  setVisible: any
}) {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [email, setEmail] = useState("")

  const { visible, setVisible, initEmail } = props
  // const dispatch = useDispatch()

  useEffect(() => {
    setVisible(visible)
    setEmail(initEmail)
  }, [visible, setVisible, initEmail, setEmail])

  const handleCancel = () => {
    setVisible(false)
  }

  const resetPassword = (value: string) => {
    setConfirmLoading(true)
    firebase
      .auth()
      .sendPasswordResetEmail(value)
      .then(() => {
        // Password reset email sent!
        handleCancel()
        message.success("send reset email success!", 3)
        setTimeout(() => {
          setConfirmLoading(false)
        }, 1000)
      })
      .catch((error) => {
        setConfirmLoading(false)
        message.error(error.code, 3)
      })
  }

  const handleOk = () => {
    resetPassword(email)
  }

  const handleInput = (event: any) => {
    setEmail(event.target.value)
  }

  return (
    <>
      <Modal
        maskClosable={false}
        title="Please enter your Email"
        visible={visible}
        onOk={handleOk}
        okText="Send link"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>
          <Input value={email} placeholder="email..." onChange={handleInput} />
        </p>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
