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
                    <Avatar size={34} src={`http://192.249.18.171:80/${Post.writer?.image}`}/>
                </Col>
                <Col style={{marginLeft: '20px', marginTop: '5px'}}>
                    <p>{Post.writer?.name}</p>
                </Col>
            </Row>
            <br/>
            <Row>
                <p>{Post.content}</p>
            </Row>
        </div>
    )
}

export default PostInfo