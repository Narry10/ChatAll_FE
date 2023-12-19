import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./chatui-theme.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { generateKeywords } from "./AISevicer";

const { Header, Content, Sider } = Layout;

const navList = [
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    label: "You",
  },
  {
    key: "2",
    icon: <LaptopOutlined />,
    label: "Bing",
  },
];
const getResquest = (input_mes, in_provider) => {
  return {
    input_mes: input_mes,
    in_provider: in_provider,
  };
};
function App() {
  const DEFAUFT = "You";
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [selectedNavItem, setSelectedNavItem] = React.useState(DEFAUFT);
  function handleMenuClick(item) {
    setSelectedNavItem(item.label);
  }
  async function handleSend(type, val) {
    try {
      if (type === "text" && val.trim()) {
        appendMsg({
          type: "text",
          content: { text: val },
          position: "right",
        });
  
        setTyping(true);
        const input = getResquest(val, selectedNavItem.toLowerCase());
        const fetchData = await generateKeywords(input);
        const value = fetchData.response;
        if (value && value.trim()) {
          appendMsg({
            type: "text",
            content: { text: value },
          });
        } else {
          appendMsg({
            type: "text",
            content: { text: "Loading false ..." },
          });
        }
      }
    } catch (error) {
      console.log("Error: " ,error);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return (
      <Bubble
        style={{ padding: "10px 20px", fontSize: "15px" }}
        content={content.text}
      />
    );
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log(selectedNavItem);
  return (
    <main>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Header
                style={{
                  width: "100%",
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 20,
                  backgroundColor: "rgba(255, 255, 255)"
                }}
              >
                Chat All
              </Header>
              {navList.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Chat
                locale="en-US"
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
                placeholder="Write question here..."
                loadMoreText="Loading..."
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </main>
  );
}

export default App;
