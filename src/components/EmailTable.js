import React, {useMemo, useState} from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react'
import {DateTimePicker} from 'react-rainbow-components'

const EmailTable = ({
  selectedEmails,
  setSelectedEmails,
  recipientsData,
  setFieldValue,
  values,
}) => {
  const [page, setPage] = useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(recipientsData?.recipients?.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return recipientsData?.recipients?.slice(start, end)
  }, [page, recipientsData.recipients])

  return (
    <div className="dashboard-emails-table">
      <DateTimePicker
        formatStyle="large"
        value={values.scheduledDateTime}
        label="Schedule time"
        onChange={(value) => setFieldValue('scheduledDateTime', value)}
        borderRadius="semi-rounded"
      />
      <Table
        color="primary"
        selectionMode="multiple"
        selectedKeys={selectedEmails}
        onSelectionChange={setSelectedEmails}
        aria-label="collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="name">EMAIL</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.email}>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {!item.unsubscribed ? 'Active' : 'Inactive'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default EmailTable
