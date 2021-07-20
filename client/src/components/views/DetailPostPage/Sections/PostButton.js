import React from 'react'
import Axios from 'axios'

function PostButton(props) {

    const postId = props.postId;
    const deletePost = (e) => {
        e.preventDefault()
        Axios.delete('/api/posts/delete', {data: {postId: postId}, withCredentials: true})
            .then(response => {
                if (response.data.success) {
                    // props.refreshFunction(response.data.post)
                    props.history.push("/");
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const updatePost = (e) => {
        e.preventDefault()
    }

    return (
        <div>
    
        </div>
    )
}

export default PostButton
