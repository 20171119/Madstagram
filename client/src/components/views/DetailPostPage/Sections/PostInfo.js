import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Avatar, Row, Col, Divider } from 'antd';

function PostInfo(props) {

    const [Post, setPost] = useState({})
    const [Writer, setWriter] = useState({})

    useEffect(() => {

        setPost(props.detail)
        setWriter(props.writer)
    }, [props.detail])

    console.log('Info', Post);
    // console.log("Writer", Writer.name);

    return (
        <div>
            <Row>
                <Col >
                    <Avatar size={32} src={`http://192.249.18.171:80/${Post.writer?.image}`} />
                </Col>
                <Col lg={8}>
                    <p style={{ marginTop: '4px', marginLeft: '8px' }}>{Post.writer?.name}</p>
                </Col>
            </Row>
            <br />
            <Row>
                <p>{Post.title}<br /><br />
                    {Post.content}</p>
            </Row>
        </div>
    )
}

export default PostInfo