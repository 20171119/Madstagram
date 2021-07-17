import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Like from './Like';
const { TextArea } = Input;
function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const commentVariable = {
        commentId: props.comment._id
    }

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const deleteComment = () => {
        Axios.delete('/api/comments/delete', {data: {commentId: props.comment._id}, withCredentials: true})
            .then(response => {
                if (response.data.success) {
                    // props.refreshFunction(response.data.post)
                    props.deleteFunction(response.data.post)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comments/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    let actions = [];
    if (props.comment.writer?._id == user.userData?._id) {
        actions = [
            <Like comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
            <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>,
            <span onClick={deleteComment} key="comment-delete">Delete </span>
        ]
    } else {
        actions = [
            <Like comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
            <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>,
        ]
    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            >
            </Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment