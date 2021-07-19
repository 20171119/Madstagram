import React, { useEffect, useState} from 'react'
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
    const [curSem, setcurSem] = useState(user.userData?.semester)


    const renderSemesters = props.semesterList.map((semester, index) => {
        if (curSem === semester.semester) {
            console.log("AAA")
            return <option key={index} value={semester.semester} selected>{semester.semester}</option>
        } else {
            return <option key={index} value={semester.semester}>{semester.semester}</option>
        }
    })

    const semesterUpdate = (newSemester) => {
        setOpenAdd(!OpenAdd)
        props.addSemester(newSemester)
        props.refreshFunction(newSemester)
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
                <Sider style={{position: 'fixed'}}>
                    {(user.userData?._id === "60f412af929e365e2571ee02" || user.userData?._id === "60f41e58e16c3633167c1605") && (
                        <div>
                            <Button onClick={semesterUpdate} style={{width:"100%"}}>Semester Add</Button> 
                        </div>
                    )}
                    <div>
                        <select name="semesters" id="semester-select" onChange={handleSemester} style={{width:"100%"}}>
                            {renderSemesters}
                        </select>
                        <UserListPage semester={curSem} userList={props.userList}/>
                    </div>
                </Sider>
                :
                <SemesterAddPage refreshFunction={semesterUpdate}/>
            }
        </div>
    )
}

export default Slider
