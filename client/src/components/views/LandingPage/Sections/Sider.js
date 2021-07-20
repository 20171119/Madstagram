import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Layout, Menu, Button, Select, Divider, Input } from 'antd';
import SemesterAddPage from './SemesterAddPage';
import { useSelector } from 'react-redux';
import UserListPage from './UserListPage';
import { PlusOutlined } from '@ant-design/icons';
const { Sider } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;

function Slider(props) {

    const user = useSelector(state => state.user)
    const [OpenAdd, setOpenAdd] = useState(false)
    const [Semesters, setSemesters] = useState([])
    const [curSem, setcurSem] = useState("2021S")
    const [New, setNew] = useState("")

    useEffect(() => {
        getSemesters();
    }, [])

    const getSemesters = () => {
        Axios.post('/api/semesters/getSemesters')
            .then(response => {
                if (response.data.success) {
                    setSemesters(response.data.semesters)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    const renderSemesters = Semesters.map((semester, index) => {
        return <Option key={index} value={semester.semester}>{semester.semester}</Option>
    })

    const semesterUpdate = (newSemester) => {
        setOpenAdd(!OpenAdd)
        setSemesters(Semesters.concat(newSemester))
    }

    const handleSemester = (e) => {
        // var e = document.getElementById("semester-select");
        console.log("handle ", e)
        var strSemester = e;
        setcurSem(strSemester);
        props.refreshFunction(strSemester);
    };

    const onNewChange = (event) => {
        setNew(event.currentTarget.value);
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            semester: New
        }
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
            <Sider style={{ overflow: 'auto', position: 'fixed', height: '50%', right: 270, backgroundColor: "#fafafa" }}>
                <div>
                    <Select name="semester-select" id="semester-select" defaultValue="2021S" onChange={handleSemester} style={{ width: "100%" }} dropdownRender={menu => (
                        <div>
                            {menu}
                            {(user.userData?._id === "60f597360aab566d36e17c0c" || user.userData?._id === "60f593a2782ea21e20c6a95b") && (
                                <div>
                                    <Divider style={{margin: '4px 0'}} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={New} onChange={onNewChange} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={onSubmit}
                                        > 
                                            <PlusOutlined /> Add
                                        </a>
                                    </div>
                                </div>                                    
                            )}
                        </div>
                    )}>
                        {renderSemesters}
                    </Select>
                    <UserListPage semester={curSem} userList={props.userList} />
                </div>
            </Sider>
        </div>
    )
}

export default Slider
