import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import {
    PlusOutlined
} from '@ant-design/icons';
import Axios from 'axios';
import "./FileUpload.css";
function FileUpload2(props) {

    const [Image, setImage] = useState("")
    const [OpenImg, setOpenImg] = useState(false)

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/posts/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    setImage(response.data.image)
                    props.refreshFunction(response.data.image)

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Image.indexOf(image);

        let newImage = [...Image]
        newImage.splice(currentIndex, 1)

        setImage(newImage)
        props.refreshFunction(newImage)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '150px', height: '100px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem', cursor: 'pointer'}} class="plusoutlined"/>

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '150px', height: '100px' }}>
                <div onClick={() => onDelete(Image)}>
                    <img style={{ maxWidth: '150px', width: '150px', height: '100px', objectFit: 'contain' }} src={`http://192.249.18.120:80/${Image}`}/>
                </div>
            </div>

        </div>
    )
}

export default FileUpload2