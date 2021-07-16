import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Layout, Menu,  } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Meta } = Card;
const { Header, Content, Sider } = Layout;

function LandingPage() {

    const [Posts, setPosts] = useState([])

    useEffect(() => {
        getProducts()

    }, [])

    const getProducts = () => {
        Axios.post('/api/posts/getPosts')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setPosts(response.data.posts)
                    console.log(Posts.length);
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const renderCards = Posts.map((post, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                key={index}
                hoverable={true}
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
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <Layout>
                <Sider style={{padding: "100 100px"}} width={200}>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" />
                    <SubMenu key="sub2" icon={<UserOutlined />} title="subnav 2" />
                    <SubMenu key="sub3" icon={<UserOutlined />} title="subnav 3" />
                    </Menu>
                </Sider>

                {Posts.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>
        
                            {renderCards}
                        </Row>
                    </div>
                }
            </Layout>
            
        </div>
    )
}

export default LandingPage