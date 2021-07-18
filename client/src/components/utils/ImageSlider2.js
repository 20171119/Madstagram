import React from 'react'
import { Carousel } from 'antd';

function ImageSlider2(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div>
                        <img style={{width: '100%', maxHeight: '200px', objectFit: 'contain'}}
                        src={`http://192.249.18.171:80/${image}`} alt="postImage" />
                    </div>

                    
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider2