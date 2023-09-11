import React from 'react'
import {Card, CardBody, CardHeader} from '@nextui-org/react'
import {MailIcon} from '../assets/mailIcon'
import {numberConverter} from '../utils/numberConverter'

const DashboardCard = ({title, data}) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="dashboard-card-header">
        <div className="dashboard-icon-container">
          <MailIcon height="50px" width="50px" viewBox="0 0 25 25" />
        </div>
      </CardHeader>
      <CardBody className="dashboard-card-body">
        <p className="dashboard-card-data">{numberConverter(data)} </p>
        <small className="text-default-500">{title}</small>
      </CardBody>
    </Card>
  )
}

export default DashboardCard
