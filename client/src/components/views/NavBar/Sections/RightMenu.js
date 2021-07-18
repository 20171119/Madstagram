/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Avatar, Button, Dropdown } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
        <div style={{marginTop: '10px'}}>
            <Button type="text">
              <a href="/login">Signin</a>
            </Button>
            <Button type="text">
              <a href="/register">Signup</a>
            </Button>
        </div>
    )
  } else {
    return (
        <div style={{marginTop: '10px'}}>
          <Button type="text">
            <a href="/posts/upload">Upload</a>
          </Button>
          {/* <Dropdown overlay={}>

          </Dropdown> */}
          <Button type="text">
            <a onClick={logoutHandler}>Logout</a>
          </Button>
          <Avatar style={{marginLeft: '5px'}} key="profile">
            <a href={`/users/${user.userData?._id}`} />
          </Avatar>
        </div>
    )
  }
}

export default withRouter(RightMenu);

