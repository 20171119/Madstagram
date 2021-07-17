import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function PostInfo(props) {

    const [Post, setPost] = useState({})
    const [Writer, setWriter] = useState({})

    useEffect(() => {

        setPost(props.detail)
        setWriter(props.writer)
    }, [props.detail])

    // console.log("Writer", Writer.name);

    return (
        <div>
            <hr/>
            <p>{Post.title}</p><br/>
            <p>{Post.Content}</p>
        </div>
    )
}

export default PostInfo