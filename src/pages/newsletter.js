import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { MailIcon } from '../assets/mailIcon';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { axiosInstance } from '../utils/axiosInstance';
import { Notification } from 'react-rainbow-components';
import '../styles/newsletter.css';

const Newsletter = () => {
  const [notification, setNotification] = useState(null)
  const initialValues = {
    email: '',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  })

  const showNotification = (title, description, icon) => {
    setNotification({title, description, icon})
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting, resetForm}) => {
        const body = {
          email: values.email,
        }
        try {
          await axiosInstance.post('/api/recipient', body)
          showNotification('Success', 'The request was successful!', 'success')
          resetForm();
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
      {({isSubmitting, values, errors, setFieldValue, handleSubmit}) => (
        <div className="newsletter-container">
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
          <div className="newsletter-form-container">
            <h1 className="newsletter-title">Stay in touch</h1>
            <p className="newsletter-text">
              Subscribe to our Newsletter and receive the latest finance news
              and exclusive insight every week. No spam!
            </p>
            <div className="newsletter-form">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                startContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                errorMessage={errors.email}
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
              />
              <Button
                className="newsletter-form-button"
                color="primary"
                isLoading={isSubmitting}
                onPress={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Newsletter
