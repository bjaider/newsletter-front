import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { MailIcon } from '../assets/mailIcon';
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Notification } from 'react-rainbow-components';
import '../styles/login.css';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)

  const showNotification = (title, description, icon) => {
    setNotification({title, description, icon})
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting, resetForm}) => {
        const body = {
          username: values.username,
          password: values.password,
        }
        try {
          const response = await axiosInstance.post('/api/user', body)
          axiosInstance.defaults.headers.common['x-auth-token'] =
            response.data.token
          localStorage.setItem('token', response.data.token)
          resetForm()
          showNotification('Success', 'The request was successful!', 'success')
          setTimeout(() => {
            navigate('/dashboard')
          }, 500)
        } catch (error) {
          showNotification(
            'Error',
            'An error occurred during the request.',
            'error',
          )
          console.error('Request error:', error)
        }
        setSubmitting(false)
      }}
    >
      {({errors, touched, values, setFieldValue, handleSubmit}) => (
        <div className="login-container">
          {notification && (
            <Notification
              title={notification.title}
              description={notification.description}
              icon={notification.icon}
              onRequestClose={() => setNotification(null)}
              style={{
                position: 'fixed',
                right: '30px',
                top: '30px',
                zIndex: 1000,
              }}
            />
          )}
          <Form>
            <Input
              type="username"
              label="Username"
              validationState={errors.username ? 'invalid' : ''}
              placeholder="Enter your username"
              errorMessage={errors.username}
              value={values.username}
              onChange={(e) => setFieldValue('username', e.target.value)}
              className="login-input-email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Input
              validationState={errors.password ? 'invalid' : ''}
              type="password"
              label="Password"
              placeholder="Enter your password"
              errorMessage={errors.password}
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              className="login-input-password"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />

            <Button
              className="login-form-button"
              color="primary"
              typw="submit"
              onPress={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Login
