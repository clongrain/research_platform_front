import { Container, Stack, Typography, Box, Paper, Grid, FormControl, InputLabel, TextField } from "@mui/material"
import WestIcon from '@mui/icons-material/West';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { SOFTWARE_COPYRIGHT_STORAGE_PATH } from "@/config";
import { fontFamily } from "@/utils/commonUtils";
import dayjs from "dayjs";
import storgeUtils from "@/utils/storageUtils";
import StyledDatePicker from "@/components/Input/StyledDatePicker";
import StyledAutocomplete from "@/components/Input/StyledAutocomplete";
import FileUploader from "@/components/FileUploader";
import { messageAPI } from "@/components/Message";
import { BootstrapInputBase } from "@/components/Input/BootstrapInput";
export default function NewSoftwareCopyright() {
  const [softwareCopyright, setSoftwareCopyright] = useState({ registration_date: dayjs(''), valid_period_deadline: dayjs('') })
  const [mutipleSelectUsers, setMutipleSelectUsers] = useState([])
  const [mutipleSelectUsersValue, setMutipleSelectUsersValue] = useState([])
  const [mutipleSelectProjects, setMutipleSelectProjects] = useState([])
  const [mutipleSelectProjectsValue, setMutipleSelectProjectsValue] = useState([])
  const [participationType, setParticipationType] = useState(null)
  const handleChangeMutipleSelectUsers = (event, newValue) => {
    setMutipleSelectUsersValue(newValue)
  }
  const handleChangeMutipleSelectProjects = (e, newValue) => {
    setMutipleSelectProjectsValue(newValue)
  }
  const checkSoftwareCopyright = () => {
    if (softwareCopyright.title === undefined || softwareCopyright.title.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Title Error', text: '无效的软著名称' })
      return false
    }
    if (softwareCopyright.owner === undefined || softwareCopyright.owner.trim().split(" ").length === 0 ||
      !(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(softwareCopyright.owner.replace(/,/g, '').replace(/ /g, '')))) {
      messageAPI.error({ title: 'Author Name Error', text: '无效的作者名称' })
      return false
    }
    if (softwareCopyright.type === undefined || softwareCopyright.type.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Type Error', text: '无效的类型' })
      return false
    }
    if (softwareCopyright.registration_number === undefined || softwareCopyright.registration_number.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Registration Number Error', text: '无效的注册号' })
      return false
    }
    if (softwareCopyright.registration_date === undefined || !softwareCopyright.registration_date) {
      messageAPI.error({ title: 'Registration Date Error', text: '无效的注册日期' })
      return
    }
    if (softwareCopyright.development_language === undefined || softwareCopyright.development_language.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Develop Language Error', text: '无效的开发语言' })
      return false
    }
    if (softwareCopyright.version === undefined || softwareCopyright.version.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Version Error', text: '无效的版本号' })
      return false
    }
    if (softwareCopyright.valid_period_deadline === undefined || softwareCopyright.valid_period_deadline === null) {
      messageAPI.error({ title: 'Valid Period Deadline Error', text: '无效的有效期' })
      return false
    }
    if (participationType === undefined || participationType===null || participationType.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Participation Type Error', text: '无效的参与类型' })
      return false
    }
    let ownPaper = false
    mutipleSelectUsersValue.forEach((user) => {
      if (user.user_id === storgeUtils.getUser().user_id) {
        ownPaper = true
      }
    })
    if (!ownPaper) {
      messageAPI.warning({ text: '若上传软件著作权，您必须是该软件著作权的拥有者之一' })
      return false
    }
    return true
  }
  const fetchData = async () => {
    setMutipleSelectUsers((await supabase.from('user_student').select('user_id,name,email')).data
      .concat((await supabase.from('user_teacher').select('user_id,name,email')).data))
    setMutipleSelectProjects((await supabase.from('project').select('id,title')).data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Container maxWidth=''>
      <Stack sx={{
        flexDirection: 'column',
        gap: '24px',
        mb: '40px'
      }}>
        {/* return students list */}
        <Box>
          <Link to={'/achievements/software-copyrights'} style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            gap: '8px',
            fontWeight: 500,
            color: '#212636',
            textDecoration: 'none',
            lineHeight: 1.57

          }}>
            <WestIcon sx={{ width: '20px', height: '20px' }} />
            Software Copyrights
          </Link>
        </Box>
        <Stack>
          <Typography sx={{
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '1.7rem',
            margin: '0',
            lineHeight: 1.2
          }}>
            Create software copyright
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Paper sx={{
          borderRadius: '16px',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
        }}>
          <Stack sx={{
            '@media(min-width:0px)': {
              padding: '32px 16px 48px'
            },
            '@media(min-width:500px)': {
              padding: '32px 32px 48px'
            }
          }}>
            <Grid container columnSpacing={3} rowSpacing={3}>
              <Grid item xs={12} md={5}>
                <Stack sx={{
                  flexDirection: 'column',
                  rowGap: '24px'
                }}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Title</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setSoftwareCopyright({ ...softwareCopyright, title: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Owner Name</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setSoftwareCopyright({ ...softwareCopyright, owner: e.target.value }) }} />
                  </FormControl>
                  <StyledAutocomplete size="small" disableCloseOnSelect fullWidth multiple options={mutipleSelectUsers} getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Stack {...props}>
                        <Typography sx={{
                          fontFamily: fontFamily,
                          fontWeight: 500,
                          color: '#212636',
                          fontSize: '1rem',
                          lineHeight: 1.57,
                        }}>{option.name}</Typography>
                        <Typography sx={{
                          color: '#667085',
                          fontWeight: 400,
                          fontFamily: fontFamily,
                          fontSize: '0.875rem',
                          lineHeight: 1.57
                        }}>{option.email}</Typography>
                      </Stack>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label='System Owner' helperText="Choose users to add" inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}>
                      </TextField>
                    )}
                    isOptionEqualToValue={(option, value) => option.email === value.email}
                    value={mutipleSelectUsersValue} onChange={handleChangeMutipleSelectUsers}
                  />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Type</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setSoftwareCopyright({ ...softwareCopyright, type: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Registration Number</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setSoftwareCopyright({ ...softwareCopyright, registration_number: e.target.value })} />
                  </FormControl>
                  <StyledDatePicker label='Registration Date' format="YYYY-MM-DD" onChange={(newValue) => { setSoftwareCopyright({ ...softwareCopyright, registration_date: newValue }) }} />
                  <StyledDatePicker label='Valid Period Deadline' format="YYYY-MM-DD" onChange={(newValue) => { setSoftwareCopyright({ ...softwareCopyright, valid_period_deadline: newValue }) }} />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Develop Language</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setSoftwareCopyright({ ...softwareCopyright, development_language: e.target.value })} />
                  </FormControl>
                  <StyledAutocomplete size="small" disableCloseOnSelect fullWidth multiple options={mutipleSelectProjects} getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <Stack {...props}>
                        <Typography sx={{
                          fontFamily: fontFamily,
                          fontWeight: 500,
                          color: '#212636',
                          fontSize: '1rem',
                          lineHeight: 1.57,
                        }}>{option.title}</Typography>
                      </Stack>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label='Related Project' helperText="Choose projects to add, if not available do not choose" inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}>
                      </TextField>
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={mutipleSelectProjectsValue} onChange={handleChangeMutipleSelectProjects}
                  />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Version</InputLabel>
                    <BootstrapInputBase multiline maxRows={100} id="bootstrap1" onChange={(e) => setSoftwareCopyright({ ...softwareCopyright, version: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Your Participation Type</InputLabel>
                    <BootstrapInputBase multiline maxRows={100} id="bootstrap1" onChange={(e) => setParticipationType(e.target.value)} />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <FileUploader uploadPath={SOFTWARE_COPYRIGHT_STORAGE_PATH} object={softwareCopyright} setObject={setSoftwareCopyright} checkObject={checkSoftwareCopyright} tableName="software_copyright" joinTableName="user_software_copyright" 
                joinTableData={mutipleSelectUsersValue.map((user)=>{
                  if(user.user_id === storgeUtils.getUser().user_id){
                    return { user_id: user.user_id, participation_type:participationType}
                  }
                  else return { user_id: user.user_id, participation_type:null }
                })} projects={mutipleSelectProjectsValue}/>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}