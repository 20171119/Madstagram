import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://192.249.18.171:80/${image}`} alt="postImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider