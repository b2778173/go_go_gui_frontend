import { Form, Input, Button, Checkbox, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import Router from "next/router"
import React, { useState, useEffect } from "react"

import FacebookLogin from "react-facebook-login"
import firebase from "firebase/app"
import styles from "../../styles/Home.module.scss"
import "firebase/auth"

export default function Login() {
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values)
    // const user = {
    //   username: values.username,
    //   password: values.password
    // }
    // await axios.post(`${Url.LOCAL}/auth`, user).then((res) => {
    //   console.log("res", res)
    //   localStorage.setItem("token", res.data.access_token)
    //   Router.push("/")
    // })

    firebase
      .auth()
      .signInWithEmailAndPassword(values.username, values.password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential
        if (user) {
          const idToken = await user.getIdToken()
          // const idToken = await firebase.auth().currentUser.getIdToken()
          sessionStorage.setItem("idToken", idToken)
          Router.push("/")
        }
      })
      .catch((error) => {
        console.log(error)
        message.error(error.code, 3)
      })

    // firebase
    //   .auth()
    //   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //   .then(() => {
    //     // Existing and future Auth states are now persisted in the current
    //     // session only. Closing the window would clear any existing state even
    //     // if a user forgets to sign out.
    //     // ...
    //     // New sign-in will be persisted with session persistence.
    //     return firebase
    //       .auth()
    //       .signInWithEmailAndPassword(values.username, values.password)
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     message.error(error.message, 3)
    //     console.log(error)
    //     const errorCode = error.code
    //     const errorMessage = error.message
    //   })

    // firebase
    //   .auth()
    //   .currentUser.getIdToken()
    //   .then((idToken) => {
    //     // idToken can be passed back to server.
    //     sessionStorage.setItem("idToken", idToken)
    //   })
    //   .catch((error) => {
    //     // Error occurred.
    //   })
  }

  const [accessToken, setAccessToken] = useState("")
  const componentClicked = (data: any) => {
    console.log(data)
  }
  const responseFacebook = (response: any) => {
    console.log(response)
    console.log(accessToken)
    setAccessToken(response.accessToken)
  }
  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAxiEDjs74HK4zqV6hWO_Zdz95J8DLHboI",
      authDomain: "go-go-gui.firebaseapp.com",
      projectId: "go-go-gui",
      storageBucket: "go-go-gui.appspot.com",
      messagingSenderId: "474218867220",
      appId: "1:474218867220:web:14139bf3599c640dbf5501",
      measurementId: "G-NFBWXVTVB7"
    }

    // init firebase
    if (!firebase.apps.length) {
      console.log(1)
      firebase.initializeApp(firebaseConfig)
    } else {
      console.log(2)
      firebase.app() // if already initialized, use that one
    }
  }, [])

  return (
    <Form
      name="normal_login"
      className={styles.container}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!"
          }
        ]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!"
          }
        ]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
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
        Or <a href="/user/register">register now!</a>
      </Form.Item>
      <FacebookLogin
        appId="479394116407879"
        autoLoad
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
      ,
    </Form>
  )
}

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
