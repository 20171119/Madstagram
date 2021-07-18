import React, { useEffect, useState} from 'react'
import Axios from 'axios';
import { Layout, Menu, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import SemesterAddPage from './SemesterAddPage';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Slider(props) {
    
    const [OpenAdd, setOpenAdd] = useState(false)
    const [Semesters, setSemesters] = useState([])

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
        console.log(strSemester);
        props.refreshFunction(strSemester);
    };

    

    return (
        <div>
            {!OpenAdd ?
                <Sider style={{position: 'fixed'}}>
                    <div>
                        <Button onClick={semesterUpdate} style={{width:"100%"}}>Semester Add</Button> 
                    </div>
                    <div>
                        <select name="semesters" id="semester-select" onChange={handleSemester} style={{width:"100%"}}>
                            {renderSemesters}
                        </select>
                    </div>
                </Sider>
                :
                <SemesterAddPage refreshFunction={semesterUpdate}/>
            }
        </div>
    )
}

export default Slider
