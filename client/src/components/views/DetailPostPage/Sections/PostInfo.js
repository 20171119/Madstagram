import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Avatar, Row, Col, Divider } from 'antd';
import "./PostInfo.css"

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
                    <Avatar size={32} src={`http://192.249.18.120:80/${Post.writer?.image}`} />
                </Col>
                <Col lg={8}>
                    <p style={{ marginTop: '4px', marginLeft: '8px' }}>{Post.writer?.name}</p>
                </Col>
            </Row>
            <br />
            <Row>
                <span><p><b>{Post.title}</b></p>
                    <p class="fontSize">{Post.content}</p></span>
            </Row>
        </div>
    )
}

export default PostInfo