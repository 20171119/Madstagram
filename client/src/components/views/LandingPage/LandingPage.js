import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import Icon from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function LandingPage() {

    const [Posts, setPosts] = useState([])
    // const [Skip, setSkip] = useState(0)
    // const [Limit, setLimit] = useState(8)
    // const [PostSize, setPostSize] = useState()
    // const [SearchTerms, setSearchTerms] = useState("")

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
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere  <Icon type="rocket" />  </h2>
            </div>

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