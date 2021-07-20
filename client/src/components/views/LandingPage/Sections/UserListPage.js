import React, { useEffect, useState } from 'react'
import { Avatar, Card } from 'antd';
import Axios from 'axios';

function UserListPage(props) {

    useEffect(() => {
    }, [])

    const renderUser = props.userList.map((user, index) => {
        return <Card key={index} >
            <a href={`/users/${user._id}`} style={{ color: 'black' }}>
                <div style={{ display: 'inline', height: '60px' }}><Avatar src={`http://192.249.18.120:80/${user.image}`} /></div>
                <div style={{ display: 'inline', marginLeft: '10px' }}>{user.name}</div>
            </a>
        </Card>
    })

    return (
        <div>
            {renderUser}
        </div>
    )
}

export default UserListPage
