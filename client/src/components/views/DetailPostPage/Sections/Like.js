import React, { useEffect, useState } from 'react'
import { Tooltip} from 'antd';
import {
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';
import Axios from 'axios';

function Like(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    let variable = {};

    if (props.post) {
        variable = { postId: props.postId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    


    useEffect(() => {

        Axios.post('/api/likes/getLikes', variable)
            .then(response => {
                // console.log('getLikes',response.data)

                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.likes.length)

                    //if I already click this like button or not 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })


    }, [])


    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('/api/likes/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/likes/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction == 'liked' && 
                        <HeartFilled
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                    }
                    {LikeAction != 'liked' && 
                        <HeartOutlined
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default Like