import React, {useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input } from 'antd'
import Icon from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { useSelector } from "react-redux";
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value:1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film"},
    {value:1, label: "Ani"}
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/video/upload', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                } else {
                    alert("upload failed")
                }
            })
    }

    const onSubmit = (e) => {
        // setCategory(e.currentTarget.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false} // true
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {/* tumb*/}
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br /><br />
                <lable>Title</lable>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />

                <br /><br />
                <lable>Description</lable>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br /><br />
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br /><br />
                <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br /><br />

                <Button type='primary' size='large' onClick>
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default VideoUploadPage
