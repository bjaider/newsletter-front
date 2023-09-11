import React, {useRef, useState} from 'react'
import {Button, Card, CardBody} from '@nextui-org/react'

const UploadFile = ({setFieldValue}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      if (file.type === 'application/pdf' || file.type === 'image/png') {
        setSelectedFile(file.name)

        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target.result.split(',')[1]
          setFieldValue('attachment', {name: file.name, file: base64})
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{display: 'none'}}
        onChange={handleFileChange}
        accept=".pdf, .png"
      />
      <Card className="dashboard-file-container">
        <CardBody>
          <Button
            color="primary"
            variant="bordered"
            className="dashboard-file-button"
            onClick={handleFileButtonClick}
          >
            Choose a file from your computer
          </Button>
          {selectedFile && <p>Selected file: {selectedFile}</p>}
        </CardBody>
      </Card>
    </div>
  )
}

export default UploadFile
