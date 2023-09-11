import React, {useEffect, useState} from 'react'
import {Button, Input, Textarea, Spinner} from '@nextui-org/react'
import DashboardCard from '../components/DashboardCard'
import UploadFile from '../components/UploadFile'
import EmailTable from '../components/EmailTable'
import {Notification} from 'react-rainbow-components'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {Formik} from 'formik'
import {axiosInstance} from '../utils/axiosInstance'
import {LogoutIcon} from '../assets/logoutIcon'
import '../styles/dashboard.css'

const Dashboard = () => {
  const [recipientsData, setRecipientsData] = useState([])
  const [newslettersData, setNewslettersData] = useState([])
  const [selectedEmails, setSelectedEmails] = useState(new Set([]))
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const initialValues = {
    subject: '',
    emailBody: '',
    attachment: {name: '', file: ''},
  }

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    emailBody: Yup.string().required('Email body is required'),
  })

  useEffect(() => {
    fetchRecipientData()
    fetchNewslettersData()
  }, [])

  const showNotification = (title, description, icon) => {
    setNotification({title, description, icon})
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  const fetchRecipientData = async () => {
    try {
      const response = await axiosInstance.get('/api/recipient')
      setRecipientsData(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const fetchNewslettersData = async () => {
    try {
      const response = await axiosInstance.get('/api/newsletter')
      setNewslettersData(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  if (!recipientsData?.recipients?.length)
    return (
      <div className="spinner">
        <Spinner size="lg" />
      </div>
    )
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting}) => {
        if (!values.attachment.file) {
          showNotification('Error', 'File is required', 'error')
          return
        }
        if (![...selectedEmails]?.length) {
          showNotification('Error', 'At least one email is required', 'error')
          return
        }
        const body = {
          emails:
            selectedEmails === 'all'
              ? recipientsData.recipients.map((item) => item.email)
              : [...selectedEmails],
          subject: values.subject,
          html: values.emailBody,
          attachment: values.attachment,
        }
        try {
          await axiosInstance.post('/api/newsletter/send', body)
          showNotification('Success', 'The request was successful!', 'success')
          navigate(0)
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
        <div className="dashboard-container">
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
          <div className="dashboard-right-container">
            <Button
              className="dashboard-logout-button"
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
              color="danger"
            >
              <LogoutIcon />
            </Button>
            <div className="dashboard-cards-container">
              <DashboardCard
                title="Subscribed Recipients"
                data={recipientsData.subscribedRecipients}
              />
              <DashboardCard
                title="Unsubscribed Recipients"
                data={recipientsData.unsubscribedRecipients}
              />
              <DashboardCard
                title="Total Recipients"
                data={recipientsData.totalRecipients}
              />
              <DashboardCard
                title="Total Newsletters"
                data={newslettersData.totalNewsletters}
              />
            </div>
            <Input
              type="text"
              label="Subject"
              labelPlacement="outside"
              className="dashboard-email-subject"
              errorMessage={errors.subject}
              value={values.subject}
              onChange={(e) => setFieldValue('subject', e.target.value)}
            />
            <Textarea
              label="Email body (HTML or text)"
              labelPlacement="outside"
              placeholder="Enter the email body"
              size="lg"
              minRows={10}
              errorMessage={errors.emailBody}
              value={values.emailBody}
              onChange={(e) => setFieldValue('emailBody', e.target.value)}
            />
            <UploadFile setFieldValue={setFieldValue} />
          </div>
          <div className="dashboard-left-container">
            <EmailTable
              selectedEmail={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              recipientsData={recipientsData}
            />

            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            >
              Send newsletter
            </Button>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Dashboard
