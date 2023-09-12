import React, { useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import '../styles/unsubscribe.css';

const Unsubscribe = () => {
  let {email} = useParams()
  useEffect(() => {
    handleUnsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUnsubscribe = async () => {
    try {
      if (email) {
        await axiosInstance.put('/api/recipient/unsubscribe/', {
          email,
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="unsubscribe-container">
      <h1>You have unsubscribed.</h1>
      <p>We're sorry to see you go. You can resubscribe anytime.</p>
    </div>
  )
}

export default Unsubscribe
