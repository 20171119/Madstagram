import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function PostImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];
            // console.log(props.detail.images)

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://192.249.18.171:80/${item}`,
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div >
            <ImageGallery items={Images} />
        </div>
    )
}

export default PostImage