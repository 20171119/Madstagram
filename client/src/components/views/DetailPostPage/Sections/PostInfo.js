import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Avatar, Row, Col } from 'antd';

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
                <Col lg={4}>
                    <Avatar size={40} src={`http://192.249.18.171:80/${Post.writer?.image}`}/>
                </Col>
                <Col lg={8}>
                    <p>{Post.writer?.name}</p>
                </Col>
            </Row>
            <br/>
            <Row>
                <p>{Post.title}</p><br/>
                <p>{Post.content}</p>
            </Row>
        </div>
    )
}

export default PostInfo