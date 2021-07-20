import React, { useState } from 'react'
import Axios from 'axios';
import {Button, Form, Input} from 'antd';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;

function SemesterAddPage(props) {

    const [Semester, setSemester] = useState("")

    const onSemesterChange = (e) => {
        setSemester(e.currentTarget.value);
    }

    const variables = {
        semester: Semester
    }

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/semesters/create', variables)
            .then(response => {
                if (response.data.success) {
                    props.refreshFunction(response.data.semester);
                    window.location.reload()
                } else {
                    alert('Failed to create semester')
                }
            })
    }


    return (
        <div>
            <Form onSubmit={onSubmit} style={{marginLeft: "10px", marginTop: "20px"}}>
                <Input
                    onChange={onSemesterChange}
                    value={Semester}
                    placeholder="Input Semester"
                />
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                    style={{width: "100%"}}
                >
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default withRouter(SemesterAddPage)
