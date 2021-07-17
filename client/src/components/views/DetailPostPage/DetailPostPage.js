import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import PostImage from './Sections/PostImage';
import PostInfo from './Sections/PostInfo';
import Comments from './Sections/Comments.js'
import { Row, Col } from 'antd';


function DetailPostPage(props) {
    const postId = props.match.params.postId
    const [Posts, setPosts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [Writer, setWriter] = useState()

    const postVariable = {
        postId: postId
    }

    useEffect(async () => {
        Axios.post('/api/posts/post_by_id', postVariable)
            .then(response => {
                setPosts(response.data.post)
                setWriter(response.data.post.writer)
                console.log(response.data.post.writer)
            })

        Axios.post('/api/comments/getComments', postVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])
        
            
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    const deleteComment = (delComment) => {
        var delCommentLists = CommentLists.filter((c) => {
            return c._id != delComment._id;
        })
        setCommentLists(delCommentLists)
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Posts.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <PostImage detail={Posts} />
                </Col>
                <Col lg={12} xs={24}>
                    <PostInfo detail={Posts} writer={Posts.writer}/>
                    <Comments CommentLists={CommentLists} postId={Posts._id} refreshFunction={updateComment} deleteFunction={deleteComment}/>
                </Col>
            </Row>
        </div>
    )
}

export default DetailPostPage