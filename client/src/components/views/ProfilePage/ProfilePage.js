import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Divider , Menu, Avatar, Empty, Button, Descriptions } from 'antd';
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

        return <Col lg={8} md={8} xs={24}>
                    <Card 
                        key={index}
                        hoverable={true}
                        cover={<a href={`/posts/${post._id}`} > 
                                <ImageSlider images={post.images} />
                            </a>}
                    >
                    </Card>
                </Col>
    })


    return (
        <div style={{minWidth: '736px', marginLeft: '270px', marginRight: '270px'}}>
            <div style={{marginBottom: '20px', marginTop: '30px'}} >
                <Row >
                    <Col lg={8}>
                        <Avatar size={100} icon={<UserOutlined/>} />
                    </Col>

                    <Col lg={16}>
                        <Descriptions 
                            title={User.name}
                            extra={<Button>프로필  수정</Button> }
                            colon>
                            <Descriptions.Item label="Posts">{Posts.length}</Descriptions.Item>
                            <Descriptions.Item label="Semester">{User.semester}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>

            <Divider>Your Post</Divider>

            <div style={{marginTop: '20px'}}>
                {Posts.length === 0 ?
                    <Empty>
                        <Button type="primary" href="/posts/upload">Upload Post</Button>
                    </Empty> :
                    <Row gutter={[32, 32]}>
                        {renderCards}
                    </Row>
                }
            </div>
            
        </div>
    )
}

export default ProfilePage