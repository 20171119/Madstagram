import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import Icon from '@ant-design/icons';

const { Meta } = Card;

function LandingPage() {

    // const [Products, setProducts] = useState([])
    // const [Skip, setSkip] = useState(0)
    // const [Limit, setLimit] = useState(8)
    // const [PostSize, setPostSize] = useState()
    // const [SearchTerms, setSearchTerms] = useState("")

    useEffect(() => {
        getProducts()

    }, [])

    const getProducts = () => {
        Axios.post('/api/posts/getPosts')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere  <Icon type="rocket" />  </h2>
            </div>
        </div>
    )
}

export default LandingPage