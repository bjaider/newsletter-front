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

const EmailTable = ({selectedEmails, setSelectedEmails, recipientsData}) => {
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
