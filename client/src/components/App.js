import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadPage from "./views/UploadPage/UploadPage";
import DetailPostPage from "./views/DetailPostPage/DetailPostPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import { Layout, Menu } from 'antd';
import io from 'socket.io-client';

// const socket = io.connect('http://192.249.18.171:80')

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)', backgroundColor: '#fafafa' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/posts/upload" component={Auth(UploadPage, true)} />
          <Route exact path="/posts/:postId" component={Auth(DetailPostPage, null)} />
          <Route exact path="/users/:userId" component={Auth(ProfilePage, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
