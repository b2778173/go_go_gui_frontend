import React from "react"
import {
  Typography,
  Input,
  Select,
  Row,
  Col,
  Button,
  Space,
  Divider,
  Tabs,
  Upload,
  message
} from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import Router from "next/router"

import "firebase/auth"
import "../../util/firebase"
import firebase from "firebase/app"
import { findProfileByToken, updateProfile } from "../../api/profile"
import { uploadImage } from "../../api/image"

const { Text, Title, Paragraph } = Typography

const { TabPane } = Tabs

function getBase64(
  img: File,
  callback: { (base64: string | ArrayBuffer | null): void }
) {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}
interface IState {
  loading: boolean
  name: string
  address: {
    city: string | undefined
    country: string | undefined
    zipCode: string | undefined
    street: string | undefined
  }
  email: string
  photoURL: string
}

class ProfileImg extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      name: "",
      address: { city: "", country: "", zipCode: "", street: "" },
      email: "",
      photoURL: ""
    }
  }

  async componentDidMount() {
    try {
      const response = await findProfileByToken()
      const { photoURL, name, address, email } = response
      this.setState({
        photoURL,
        name,
        address,
        email
      })
    } catch {
      //
    }
  }

  handleChange = async (info: any) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, () =>
        this.setState({
          loading: false
        })
      )
      // upload image api
      const data = new FormData()
      data.append("image", info.fileList[0].originFileObj)
      const response = await uploadImage(data)
      this.setState({
        photoURL: response.url
      })
      message.success(response.message)
    }
  }

  handleCounytyChange = (value: string) => {
    const { address } = this.state
    const copy = JSON.parse(JSON.stringify(address))
    copy.country = value
    this.setState({
      address: copy
    })
  }

  handleCityChange = (value: string) => {
    const { address } = this.state
    const copy = JSON.parse(JSON.stringify(address))
    copy.city = value
    this.setState({
      address: copy
    })
  }

  save = () => {
    const { name, address, email, photoURL } = this.state
    // update firebase
    const user = firebase.auth().currentUser
    if (user) {
      user
        .updateProfile({
          displayName: name,
          photoURL
        })
        .then(async () => {
          // update profile api
          await updateProfile({
            username: email,
            name,
            address,
            email,
            photoURL
          })
          message.success("save success")
          Router.push("/user/login")
        })
        .catch((error) => {
          // console.log(error)
          message.error(error.message)
        })
    }
  }

  render() {
    const { loading, name, address, email, photoURL } = this.state

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Row>
          <Col span={4} />
          <Col span={20}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="General" key="1">
                <Space direction="vertical">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}>
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Space>
                <Divider orientation="left" plain>
                  <Title level={5}>Personal Info</Title>
                </Divider>
                <Space direction="vertical">
                  <div>
                    <Title level={5}>
                      <Text type="secondary">Name</Text>
                    </Title>
                    <Space size={13}>
                      <Paragraph> </Paragraph>
                      <Paragraph
                        editable={{
                          onChange: (val: string) => {
                            this.setState({ name: val })
                          }
                        }}>
                        {name}
                      </Paragraph>{" "}
                    </Space>
                  </div>
                  <div>
                    <Title level={5}>
                      <Text type="secondary">Email</Text>
                    </Title>
                    <Space size={13}>
                      <Paragraph> </Paragraph>
                      <Paragraph
                        editable={{
                          onChange: (val: string) => {
                            this.setState({ email: val })
                          }
                        }}>
                        {email}
                      </Paragraph>{" "}
                    </Space>
                  </div>
                  <div>
                    <Title level={5}>
                      <Text type="secondary">Location</Text>
                    </Title>

                    <Row>
                      <Text type="secondary">country</Text>
                    </Row>
                    <Row>
                      <Select
                        onChange={this.handleCounytyChange}
                        placeholder="Select city"
                        value={address.country}>
                        <Select.Option value="US">US</Select.Option>
                        <Select.Option value="TW">TW</Select.Option>
                      </Select>
                    </Row>

                    <Row>
                      <Text type="secondary">city</Text>
                      <Input.Group compact>
                        <Select
                          placeholder="Select city"
                          onChange={this.handleCityChange}
                          value={address.city}>
                          <Select.Option value="New York">
                            New York
                          </Select.Option>
                          <Select.Option value="Winnepeg">
                            Winnepeg
                          </Select.Option>
                        </Select>

                        {/* <Input
                          style={{ width: "15%" }}
                          placeholder="zip_code"
                        /> */}

                        <Input
                          style={{ width: "50%" }}
                          placeholder="Input street"
                          value={address.street}
                          onChange={(e: any) => {
                            const copy = JSON.parse(JSON.stringify(address))
                            copy.street = e.target.value
                            this.setState({ address: copy })
                          }}
                        />
                      </Input.Group>
                    </Row>

                    <Row>
                      <Text type="secondary">zipCode</Text>
                    </Row>
                    <Row>
                      {address.zipCode}
                      <Space size={13}>
                        <Paragraph> </Paragraph>
                        <Paragraph
                          editable={{
                            onChange: (val: string) => {
                              const copy = JSON.parse(JSON.stringify(address))
                              copy.zipCode = val
                              this.setState({ address: copy })
                            }
                          }}
                        />{" "}
                      </Space>
                    </Row>
                  </div>
                  <div>
                    <Button type="primary" onClick={this.save}>
                      Save Change
                    </Button>
                  </div>
                </Space>
              </TabPane>
              <TabPane tab="Password" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Connected Account" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </>
    )
  }
}

export default ProfileImg
