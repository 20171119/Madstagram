import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Layout, Menu, Avatar } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

import { UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Meta } = Card;

function ProfilePage(props) {
    const userId = props.match.params.userId

    const [Posts, setPosts] = useState([])
    const [User, setUser] = useState([])

    const userVariable = {
        userId: userId
    }

    useEffect(() => {
        getUser()
        getPosts()

    }, [])

    const getUser = () => {
        Axios.post('/api/users/user_by_id', userVariable)
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
        
            
    }

    const getPosts = () => {
        Axios.post('/api/posts/posts_by_user', userVariable)
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }


    const renderCards = Posts.map((post, index) => {

        return <Col>
            <Card 
                title={
                <div><Avatar src="post.writer.image"/></div>, <div>{post.writer.name}</div>}
                style={{ marginBottom: 24 }}
                key={index}
                hoverable={true}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                cover={<a href={`/posts/${post._id}`} > <ImageSlider images={post.images} /></a>}
            >
                <Meta
                    title={post.title}
                    content={`${post.content}`}
                />
            </Card>
        </Col>

    })


    return (
        <div></div>
    )
}

export default ProfilePage