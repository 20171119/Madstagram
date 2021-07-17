import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import PostImage from './Sections/PostImage';
import PostInfo from './Sections/PostInfo';
import Comments from './Sections/Comments.js'
// import PostButton from './Sections/PostButton.js'
import { Row, Col, Menu} from 'antd';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UpdatePage from '../UpdatePage/UpdatePage';


function DetailPostPage(props) {
    const user = useSelector(state => state.user)
    const postId = props.match.params.postId
    const [Posts, setPosts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [Writer, setWriter] = useState()
    const [OpenUpdate, setOpenUpdate] = useState(false)
    const [VisibleBtn, setVisibleBtn] = useState(true)
    
    const postVariable = {
        postId: postId
    }

    useEffect(() => {
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

    const deletePost = (e) => {
        if (window.confirm("Really Delete?") == true) {
            Axios.delete('/api/posts/delete', {data: {postId: postId}, withCredentials: true})
            .then(response => {
                if (response.data.success) {
                    // props.refreshFunction(response.data.post)
                    alert("Succesfully Delete")
                    props.history.push("/");
                } else {
                    alert('Failed to save Comment')
                }
            })
        }
    }

    const updatePost = () => {
        setOpenUpdate(!OpenUpdate);
        setVisibleBtn(!setVisibleBtn);
    }

    console.log(Writer)

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Posts.title}</h1>
            </div>
            <br />
                {Posts.writer?._id === user.userData?._id && VisibleBtn &&
                    <button onClick={deletePost}>Delete</button>
                }
                {Posts.writer?._id === user.userData?._id && VisibleBtn &&
                    <button onClick={updatePost}>Update</button>
                }
                {!OpenUpdate && (
                    <Row gutter={[16, 16]} >
                        <Col lg={12} xs={24}>
                            <PostImage detail={Posts} />
                        </Col>
                        <Col lg={12} xs={24}>
                            <PostInfo detail={Posts} writer={Posts.writer}/>
                            <Comments CommentLists={CommentLists} postId={Posts._id} refreshFunction={updateComment} deleteFunction={deleteComment}/>
                        </Col>
                    </Row>
                )}
            {OpenUpdate &&
                <UpdatePage user={user} post={Posts}></UpdatePage>
            }
        </div>
    )
}

export default withRouter(DetailPostPage)