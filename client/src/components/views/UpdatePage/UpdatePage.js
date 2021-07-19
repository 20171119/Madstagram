import React, { useState } from 'react'
import { Typography, Button, Form, message, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

function UpdatePage(props) {
    const [TitleValue, setTitleValue] = useState(props.post.title)
    const [ContentValue, setContentValue] = useState(props.post.content)
    const [Images, setImages] = useState(props.post.images)


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            postId: props.post._id,
            title: TitleValue,
            content: ContentValue,
            images: Images,
        }

        Axios.put('/api/posts/update', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Posts Successfully Updated')
                    console.log(response.data)
                    props.history.push(`/users/${props.user.userData._id}`);
                    
                } else {
                    alert('Failed to upload Posts')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Update your Posts</Title>
            </div>

            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Content</label>
                <TextArea
                    onChange={onContentChange}
                    value={ContentValue}
                />
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default withRouter(UpdatePage)