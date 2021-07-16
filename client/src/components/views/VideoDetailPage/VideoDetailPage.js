import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';

function VideoDetailPage(props) {

    const photoId
    const [Video, setVideo] = useState([])

    useEffect(() => {
        axios.post('/api/video/getVideo')
    })

    return (
        
    )
}

export default VideoDetailPage
