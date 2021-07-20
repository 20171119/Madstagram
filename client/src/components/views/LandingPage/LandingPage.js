import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Avatar } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Like from '../DetailPostPage/Sections/Like';
import Sider from './Sections/Sider'
import CommentNum from '../DetailPostPage/Sections/CommentNum';

const { Meta } = Card;

function LandingPage() {
    const [Posts, setPosts] = useState([])
    const [Semester, setSemester] = useState("2021S")
    const [userList, setuserList] = useState([]);

    const variable = {
        semester: Semester
    }

    useEffect(() => {
        Axios.post('/api/posts/getPosts', variable)
            .then(response => {
                console.log("getPosts");
                if (response.data.success) {
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })

        Axios.post('/api/users/semester', variable)
            .then(response => {
                console.log("/users/semester");
                if (response.data.success) {
                    setuserList(response.data.users)
                } else {
                    alert('Failed to fectch product datas')
                }
            })

    }, [Semester])

    const updateSemester = (selectSemester) => {
        setSemester(selectSemester)
        console.log("updateSemester");
    }

    const renderCards = Posts.map((post, index) => {

        return <Col key={index}>
            <Card 
                title={<div style={{maxHeight: '30px'}}> 
                    <a href={`/users/${post.writer?._id}`} style={{color: 'black'}}>
                        <div style={{display: 'inline'}}><Avatar src={`http://192.249.18.120:80/${post.writer?.image}`}/></div> 
                        <div style={{display: 'inline', marginLeft: '10px'}}>{post.writer?.name}</div>
                    </a>
                </div>}
                style={{ marginBottom: 24 }}
                key={index}
                hoverable={true}
                actions={[
                    <Like post postId={post._id} userId={localStorage.getItem('userId')}></Like>,
                    <CommentNum postId={post._id}></CommentNum>
                ]}
                cover={<ImageSlider images={post.images} />}
            >
                <Meta
                    title={post.title}
                    description={post.content}
                />
            </Card>
        </Col>

    })


    return (
        <div style={{ marginLeft: '288px', marginRight: '270px', marginTop: '20px' }}>
            <Row>
                <Col xs={24} sm={24} md={18} lg={15} >
                    {Posts.length === 0 ?
                        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div >
                            {renderCards}
                        </div>
                    }
                </Col>
                <Col xs={0} sm={0} md={6} lg={9}>
                    <Sider refreshFunction={updateSemester} userList={userList}/>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage