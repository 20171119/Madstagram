import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Layout, Menu, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import SemesterAddPage from './SemesterAddPage';
import { useSelector } from 'react-redux';
import UserListPage from './UserListPage';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Slider(props) {

    const user = useSelector(state => state.user)
    const [OpenAdd, setOpenAdd] = useState(false)
    const [Semesters, setSemesters] = useState([])
    const [curSem, setcurSem] = useState("2021S")

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
        return <option key={index} value={semester.semester}>{semester.semester}</option>
    })

    const semesterUpdate = (newSemester) => {
        setOpenAdd(!OpenAdd)
        setSemesters(Semesters.concat(newSemester))
    }

    const handleSemester = (e) => {
        var e = document.getElementById("semester-select");
        var strSemester = e.value;
        setcurSem(strSemester);
        props.refreshFunction(strSemester);
    };



    return (
        <div>
            {!OpenAdd ?
                <Sider style={{ overflow: 'auto', position: 'fixed', height: '50%', right: 270 }}>
                    {(user.userData?._id === "60f593a2782ea21e20c6a95b" || user.userData?._id === "60f597360aab566d36e17c0c") && (
                        <div>
                            <Button onClick={semesterUpdate} style={{ width: "100%" }}>Semester Add</Button>
                        </div>
                    )}
                    <div>
                        <select name="semesters" id="semester-select" onChange={handleSemester} style={{ width: "100%" }}>
                            {renderSemesters}
                        </select>
                        <UserListPage semester={curSem} userList={props.userList} />
                    </div>
                </Sider>
                :
                <SemesterAddPage refreshFunction={semesterUpdate} />
            }
        </div>
    )
}

export default Slider
