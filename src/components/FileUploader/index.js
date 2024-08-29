import { Box, Button, Chip, Stack, Typography } from "@mui/material"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRef, useState } from "react";
import supabase, { BUCKET_NAME } from "@/config";
import storageUtils from "@/utils/storageUtils";
import { messageAPI } from "../Message";
import { fontFamily, returnFileSize } from "@/utils/commonUtils";
export default function FileUploader({uploadPath="",  checkObject=()=>{}, tableName="", joinTableName="", joinTableData=[], object, setObject=()=>{}, projects=[]}) {

  const [uploadFile, setUploadFile] = useState(null)
  const [canUpload, setCanUploadFile] = useState(true)
  const [canRemove, setCanRemove] = useState(true)
  const uploadFileButton = useRef()

  const handleAddFile = () => {
    const input = document.getElementById('uploadFile')
    input.click()
  }
  const handleInputChange = (event) => {
    const input = document.getElementById('uploadFile')
    const files = event.target.files
    if (files && files.length > 0) {
      setUploadFile(files[0])
    }
    else if (input.value === "") {
      setUploadFile(null)
    }
  }
  const handleDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (!event.dataTransfer.types.includes("Files")) {
      alert("仅支持拖拽文件")
    }
    if (files.length === 1) {
      setUploadFile(files[0])
    }
  }
  const handleClickUpload = async () => {
    if (uploadFile && canUpload && checkObject()) {
      setCanUploadFile(!canUpload)
      setCanRemove(false)
      setObject({ ...object, storage_path: uploadPath + storageUtils.getUser().user_id + '_' + uploadFile.name })
      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(uploadPath + storageUtils.getUser().user_id + '_' + uploadFile.name, uploadFile)
      if (error) {
        messageAPI.error({ title: "Error", text: error.message })
        setCanUploadFile(true)
        setCanRemove(true)
      }
      else if (data) {
        const objectData = await supabase.from(tableName).insert({ ...object, storage_path: uploadPath + storageUtils.getUser().user_id + '_' + uploadFile.name }).select()
        setCanUploadFile(true)
        setCanRemove(true)
        if (!objectData.error) {
          let field = ''
          if (tableName==='conference_paper' || tableName==='journal_paper'){
            field = 'paper_id'
          }
          else{
            field = tableName + '_id'
          }
          const res = await supabase.from(joinTableName).insert(joinTableData.map((item)=>{
            item[field] = objectData.data[0].id
            return item
          }))
          const res2 = await supabase.from('project_'+tableName).insert(projects.map((project)=>{
            const item = {project_id:project.id}
            item[field] = objectData.data[0].id
            return item
          }))
          if(res.error){
            messageAPI.error({ text: res.error.message })
          }
          else if(res2.error){
            messageAPI.error({ text: res2.error.message })
          }
          else{
            messageAPI.success({ title: "Success", text: "You have successfully uploaded the file! :)" })
          }
          handleClickRemove()
        }
        else {
          messageAPI.error({ text: objectData.error.message })
          await supabase
            .storage
            .from(BUCKET_NAME)
            .remove([uploadPath + storageUtils.getUser().user_id + '_' + uploadFile.name])
        }
      }
    }
  }
  const handleClickRemove = () => {
    if (canRemove) {
      const input = document.getElementById('uploadFile')
      setUploadFile(null)
      input.files = null
      input.value = ""
    }
  }

  return (
    <Box sx={{
      borderRadius: '12px',
      border: '2px dashed rgba(145, 158, 171, 0.2)',
      pb: '32px',
      mt: '24px'
    }}>
      <input type="file" id="uploadFile" accept=".pdf" style={{ opacity: 0 }} onChange={handleInputChange} />
      <Stack ref={uploadFileButton} sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ':hover': {
          opacity: 0.6
        }
      }} component={'div'} onClick={handleAddFile} onDrop={handleDrop} onDragEnter={(e) => { e.preventDefault() }} onDragOver={(e) => e.preventDefault()}>
        <Box sx={{
          '@media(min-width:0px)': {
            width: '200px',
            height: '200px',
          },
          '@media(min-width:500px)': {
            width: '300px',
            height: '300px',
          },
          backgroundImage: 'url(/文件.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mt: '10px'
        }} >
        </Box>
        <Stack gap={'8px'} flexDirection={'column'} textAlign={'center'} mt={"-48px"}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 700 }}>Drop or Select file</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: 'rgb(99, 115, 129)', fontWeight: 400 }}>Drop files here or click browse through machine</Typography>
        </Stack>
      </Stack>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0 6px',
        alignItems: 'center',
        mt: '24px'
      }}>
        <Stack sx={{
          flexDirection: 'column',
          rowGap: '2rem',
          alignItems: 'center'
        }}>
          <Stack sx={{
            flexDirection: 'row',
            columnGap: '16px'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <Typography sx={{
                fontSize: '1rem',
                fontWeight: 500, color: 'rgb( 46 38 61 / 0.9)',
                fontFamily: fontFamily,
              }}>
                Status:
              </Typography>
              {uploadFile ? <Chip color="success" label="Selected" sx={{ fontSize: '1rem' }} />
                : <Chip color="error" label="Empty" sx={{ fontSize: '1rem' }} />
              }
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <Typography sx={{
                fontSize: '1rem',
                fontWeight: 500, color: 'rgb( 46 38 61 / 0.9)',
                fontFamily: fontFamily,
              }}>
                Size:
              </Typography>
              <Chip color="info" label={uploadFile ? returnFileSize(uploadFile.size) : ('0 KB')} sx={{ fontSize: '1rem' }} />

            </Box>
          </Stack>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <Typography sx={{
              fontSize: '1rem',
              fontWeight: 500, color: 'rgb( 46 38 61 / 0.9)',
              fontFamily: fontFamily,
            }}>
              Name:
            </Typography>
            <Chip color="primary" label={uploadFile ? uploadFile.name : "None"} sx={{
              height: 'auto',
              minHeight: '32px',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
              },
            }} />
          </Box>
          <Stack>
            <Button disabled={(uploadFile === undefined) || (uploadFile === null)} sx={{
              color: '#fff',
              backgroundColor: 'rgb(17 133 136)',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              ':hover': {
                backgroundColor: 'rgb(10 103 106)'
              },
              '&.Mui-disabled': {
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(10 103 106 / 43%)'

              },
            }} startIcon={<DeleteOutlinedIcon />} onClick={handleClickRemove}>
              Import Information Using File
            </Button>
          </Stack>
          <Stack sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            columnGap: '24px'
          }}>
            <Button disabled={(uploadFile === undefined) || (uploadFile === null)} sx={{
              color: 'rgb(33, 43, 54)',
              backgroundColor: '#fff',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              border: '1px solid rgba(145, 158, 171, 0.32)',
            }} startIcon={<DeleteOutlinedIcon />} onClick={handleClickRemove}>
              Remove
            </Button>
            <Button disabled={(uploadFile === undefined) || (uploadFile === null)} sx={{
              color: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(33, 43, 54)',
              boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 5px',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 18px',
              '&.Mui-disabled': {
                color: 'rgb(255, 255, 255)',
                backgroundColor: '#dadce1'
              },
              ':hover': {
                backgroundColor: 'rgb(100 103 106)'
              }
            }} startIcon={<CloudUploadIcon />} onClick={handleClickUpload}>
              Upload
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}