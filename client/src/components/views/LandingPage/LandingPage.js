import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Layout, Menu, Avatar } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Sider from './Section/Sider'

import { UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Meta } = Card;

function LandingPage() {

    const [Posts, setPosts] = useState([])


    useEffect(() => {
        getPosts()

    }, [])

    const getPosts = () => {
        Axios.post('/api/posts/getPosts')
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.posts)
                    console.log(Posts.length);
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const renderCards = Posts.map((post, index) => {

        return <Col key={index}>
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
        <div style={{ marginLeft: '270px', marginRight: '270px' }}>
            <Row>
                <Col xs={0} sm={0} md={6} lg={8}>
                    <Sider />
                </Col>
                <Col xs={24} sm={24} md={18} lg={16} style={{width: "450px" }}>
                    {Posts.length === 0 ?
                        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div >
                            {renderCards}
                        </div>
                    }
                </Col>

            </Row>
        </div>
    )
}

export default LandingPage