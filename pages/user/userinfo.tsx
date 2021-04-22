import React from "react"
import {
  Typography,
  //   Image,
  Row,
  Col,
  Avatar,
  Button,
  Space,
  Divider,
  //   List,
  //   Skeleton,
  Tabs
} from "antd"
import { UserOutlined } from "@ant-design/icons"

const { Text, Title, Paragraph } = Typography

const fakeDataUrl = `https://randomuser.me/api/`
const { TabPane } = Tabs

class ProfileImg extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      initLoading: true,
      loading: false,
      //   data: [],
      userInfo: [],
      name: { first: null, last: null },
      location: { city: null, country: null, state: null, postcode: null },
      email: "",
      picture: { large: null }
    }
  }

  componentDidMount() {
    // Mock User Info Api from https://randomuser.me/
    fetch(fakeDataUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => {
      let response: { result: any[] } = { result: [] }

      response = await res.json()

      const userInfo = response.result[0]

      this.setState({
        initLoading: false,
        // data: response.result,
        userInfo,
        name: userInfo.name,
        location: userInfo.location,
        email: userInfo.email,
        picture: userInfo.picture
      })
    })
  }

  render() {
    const {
      initLoading,
      loading,
      userInfo,
      name,
      location,
      email,
      picture
    } = this.state

    return (
      <>
        <Row>
          <Col span={4} />
          <Col span={20}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="General" key="1">
                <Space direction="vertical">
                  <div>
                    <Avatar
                      src={picture.large}
                      size={120}
                      icon={<UserOutlined />}
                    />
                  </div>
                  <Button>Upload Photo</Button>
                </Space>
                <Divider orientation="left" plain>
                  <Title level={5}>Personal Info</Title>
                </Divider>
                <Space direction="vertical">
                  <div>
                    <Title level={5}>
                      <Text type="secondary">Name</Text>
                    </Title>
                    {name.first} {name.last}
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
                    {/* <Row><Text type="secondary">street</Text></Row> */}
                    {/* <Row>{location.street}</Row> */}
                    <Row>
                      <Text type="secondary">city</Text>
                    </Row>
                    <Row>{location.city}</Row>

                    <Row>
                      <Text type="secondary">country</Text>
                    </Row>
                    <Row>{location.country}</Row>

                    <Row>
                      <Text type="secondary">state</Text>
                    </Row>
                    <Row>{location.state}</Row>

                    <Row>
                      <Text type="secondary">postcode</Text>
                    </Row>
                    <Row>{location.postcode}</Row>
                  </div>
                  <div>
                    <Button type="primary">Save Change</Button>
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
