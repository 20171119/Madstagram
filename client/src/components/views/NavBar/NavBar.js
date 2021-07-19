import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Avatar } from 'antd';
import Icon from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  // style={{width: '50px', height: '50px'}}
  // className="menu__logo"
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 10, width: '100%', height: '54px', paddingLeft: '270px', paddingRight: '270px' }}>
      <div className="menu__logo">
        <a href="/">
          <Avatar size={50} src="http://192.249.18.171:80/uploads/1626692668020_logo.png"/>
        </a>
      </div>
      <div align="right">
          <RightMenu />
      </div>
    </nav>
  )
}

export default NavBar