import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import firebase from "firebase/app"
import "firebase/auth"
import "../../util/firebase"
import { useSelector, useDispatch } from "react-redux"
import Router from "next/router"
import styles from "../../styles/Home.module.scss"
import { State } from "../../store"
import { UserState } from "../../store/reducer/user"
import userActions, { LogIn } from "../../store/action/user"

function Login() {
  // Local signed-in state.
  // const [isSignedIn, setIsSignedInUser] = useState(false)
  // redux state
  const userState = useSelector<State, UserState>((state: State) => state.user)
  const { isSignedIn, currentUser } = userState
  const dispatch = useDispatch()

  const setIsSignedInUser = (isSigned: boolean, user: any) =>
    dispatch({
      type: "SET_USER",
      payload: { isSignedIn: isSigned, currentUser: user }
    })

  const setToken = async (user: any) => {
    const idToken = await user.getIdToken()
    sessionStorage.setItem("idToken", idToken)
  }

  const deletToken = async () => {
    sessionStorage.removeItem("idToken")
  }

  const onLoginIn = async (payload: LogIn) => {
    dispatch(userActions.login(payload))
  }

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
        console.log("signInSuccessWithAuthResult", authResult, redirectUrl)
        Router.push("/")
        return false
      }
    },
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
      // Router.push("/")
    }
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user: any) => {
        // console.log(`onAuthStateChanged`, user)
        let userData = null
        if (user) {
          userData = {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid
          }
          setToken(user)
        } else {
          deletToken()
        }
        setIsSignedInUser(!!user, userData)
      })
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver()
  }, [])

  return (
    <>
      {/* <h1>{text}</h1> */}
      <div className={styles.container}>
        <h1>Welcom to GO-GO-GUI</h1>
        {!isSignedIn ? (
          <Form
            className={styles.logForm}
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
            {/* fb, google login */}
            <div>
              <StyledFirebaseAuth
                className={styles.firebaseui}
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </Form>
        ) : (
          <div>
            <p>
              Welcome{" "}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "yellowgreen"
                }}>
                {currentUser.displayName}!
              </span>{" "}
              You are now signed-in!
            </p>
            <Button type="link" onClick={() => dispatch({ type: "LOG_OUT" })}>
              Sign-out
            </Button>
            <Button type="link" onClick={() => Router.push("/")}>
              Home
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Login
