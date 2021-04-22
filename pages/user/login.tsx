import { Form, Input, Button, Checkbox, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import Router from "next/router"
import React, { useState, useEffect } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import firebase from "firebase/app"
import "firebase/auth"
import "../../util/firebase"

import styles from "../../styles/Home.module.scss"

export default function Login() {
  // Local signed-in state.
  const [isSignedIn, setIsSignedIn] = useState(false)

  const setToken = async (user: any) => {
    const idToken = await user.getIdToken()
    sessionStorage.setItem("idToken", idToken)
  }

  const deletToken = async () => {
    sessionStorage.removeItem("idToken")
  }

  const onLoginIn = async (values: any) => {
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
          setToken(user)
          Router.push("/")
        }
      })
      .catch((error) => {
        message.error(error.code, 3)
      })
  }

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  }

  // componentDidMounted
  useEffect(() => {
    // check login status is ture , redirct to home page
    const idToken = sessionStorage.getItem("idToken")
    if (idToken) {
      Router.push("/")
    }
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        // console.log(`onAuthStateChanged`)
        setIsSignedIn(!!user)
        if (user) {
          setToken(user)
        } else {
          deletToken()
        }
      })
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1>Welcom to GO-GO-GUI</h1>
        {!isSignedIn ? (
          <Form
            name="normal_login"
            initialValues={{
              remember: true
            }}
            onFinish={onLoginIn}>
            <p>Please sign-in:</p>
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
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}>
                Log in
              </Button>
              Or <a href="/user/register">register now!</a>
            </Form.Item>
            {/* fb login */}
            {/* <FacebookLogin
              appId="479394116407879"
              autoLoad
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            /> */}

            {/* fb, google login */}
            <div>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </Form>
        ) : (
          <div>
            <p>
              Welcome {firebase.auth().currentUser?.displayName}! You are now
              signed-in!
            </p>
            <Button type="link" onClick={() => firebase.auth().signOut()}>
              Sign-out
            </Button>
          </div>
        )}
      </div>
    </>
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
