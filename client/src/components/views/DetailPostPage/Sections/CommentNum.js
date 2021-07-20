import React, { useEffect, useState } from 'react'
import { Tooltip} from 'antd';
import {
  MessageOutlined
} from '@ant-design/icons';
import Axios from 'axios';

function CommentNum(props) {

    const [commentNum, setcommentNum] = useState(0);
    console.log("DD", props.postId)
    let variable= {
        postId: props.postId
    }

    useEffect(() => {
        Axios.post('/api/comments/getComments', variable)
            .then(response => {
                // console.log('getLikes',response.data)
                if (response.data.success) {
                    //How many comments does this video or comment have 
                    setcommentNum(response.data.comments.length)

                } else {
                    alert('Failed to get comments')
                }
            })

    }, [])

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Comment">
                    <a style={{display:"inline"}} href={`/posts/${props.postId}`} ><MessageOutlined key="edit" /></a>
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{commentNum}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default CommentNum