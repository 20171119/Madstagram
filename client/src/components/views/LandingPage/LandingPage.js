import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function LandingPage() {
    const [Posts, setPosts] = useState([]);

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


        </div>
    )
}

export default LandingPage