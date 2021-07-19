import React, { useEffect, useState} from 'react'
import Axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FileUpload2 from '../../utils/FileUpload2';
import { withRouter } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const [Semesters, setSemesters] = useState([])
  const [usrSem, setusrSem] = useState(props.user.semester)
  const [Image, setImage] = useState(props.user.image)
  const [Name, setName] = useState(props.user.name)
  const [Password, setPassword] = useState("")

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

  const handleSemester = (e) => {
    var e = document.getElementById("semester-select");
    setusrSem(e.value);
  };

  const onNameChange = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.currentTarget.value)
  }

  const renderSemesters = Semesters.map((semester, index) => {
    return <option key={index} value={semester.semester}>{semester.semester}</option>
  })

  const updateImage = (newImage) => {
    setImage(newImage)
  }

  const onSubmit= (event) => {
    event.preventDefault();
    
    let dataToSubmit = {
      userId: props.user._id,
      email: props.user.email,
      password: Password,
      name: Name,
      image: Image,
      semester: usrSem
    };

    console.log("A", dataToSubmit)

    Axios.put('/api/users/update', dataToSubmit)
      .then(response => {
          if (response.data.success) {
              alert('User profile successfully editted')
              console.log(response.data)
              props.history.push("/");
              
          } else {
              alert('Failed to upload Posts')
          }
      })
  }

  return (

    <Formik
        initialValues={{
            email: props.user.email,
            name: Name,
            password: '',
            confirmPassword: '',
            semester: usrSem,
            image: Image
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string()
            .required('Name is required'),
            email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
            password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
    >
        {props => {
            const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            } = props;
            return (
            <div className="app">
                <h2>Edit Profile</h2>
                <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={onSubmit} >
                <Form.Item label="Image" required>
                    <FileUpload2 refreshFunction={updateImage} />
                </Form.Item>
                <Form.Item required label="Name">
                    <Input
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={values.name}
                    onChange={onNameChange}
                    onBlur={handleBlur}
                    className={
                        errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                    />
                    {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                    )}
                </Form.Item>
                
                <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                    <Input
                    id="email"
                    placeholder="Enter your Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                    />
                    {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                    )}
                </Form.Item>

                <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={onPasswordChange}
                    onBlur={handleBlur}
                    className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                    />
                    {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                    )}
                </Form.Item>

                <Form.Item required label="Confirm" hasFeedback>
                    <Input
                    id="confirmPassword"
                    placeholder="Enter your confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                    }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">{errors.confirmPassword}</div>
                    )}
                </Form.Item>

                <Form.Item required label="Semester">
                    <select name="semesters" id="semester-select" onChange={handleSemester}>
                    <option value="">--Please Select you semester--</option>
                    {renderSemesters}
                    </select>
                </Form.Item>
                

                <Form.Item {...tailFormItemLayout}>
                    <Button onClick={onSubmit} type="primary" >
                      Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
            );
        }}
    </Formik>
  );
};


export default withRouter(RegisterPage)
