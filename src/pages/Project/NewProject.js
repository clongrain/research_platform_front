import { Container, Stack, Typography, Box, Paper, Grid, FormControl, InputLabel, TextField } from "@mui/material"
import WestIcon from '@mui/icons-material/West';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { PROJECT_STORAGE_PATH } from "@/config";
import { fontFamily } from "@/utils/commonUtils";
import dayjs from "dayjs";
import storgeUtils from "@/utils/storageUtils";
import StyledAutocomplete from "@/components/Input/StyledAutocomplete";
import StyledDatePicker from "@/components/Input/StyledDatePicker";
import FileUploader from "@/components/FileUploader";
import { messageAPI } from "@/components/Message";
import { BootstrapInputBase } from "@/components/Input/BootstrapInput";
export default function NewProject() {
  const [project, setProject] = useState({ start_date: dayjs(''), end_date: dayjs('') })
  const [mutipleSelectUsers, setMutipleSelectUsers] = useState([])
  const [mutipleSelectLeadersValue, setMutipleSelectLeadersValue] = useState([])
  const [mutipleSelectParticipantsValue, setMutipleSelectParticipantsValue] = useState([])
  const handleChangeMutipleSelectLeaders = (event, newValue) => {
    setMutipleSelectLeadersValue(newValue)
  }
  const handleChangeMutipleSelectParticipants = (event, newValue) => {
    setMutipleSelectParticipantsValue(newValue)
  }
  const checkProject = () => {
    if (project.title === undefined || project.title.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Title Error', text: '无效的项目名称' })
      return false
    }
    if (project.leader === undefined || project.leader.trim().split(" ").length === 0 ||
      !(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(project.leader.replace(/,/g, '').replace(/ /g, '')))) {
      messageAPI.error({ title: 'Leader Name Error', text: '无效的负责人姓名' })
      return false
    }
    if (project.participant === undefined || project.participant.trim().split(" ").length === 0 ||
      !(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(project.member.replace(/,/g, '').replace(/ /g, '')))) {
      messageAPI.error({ title: 'Participant Name Error', text: '无效的参与者姓名' })
      return false
    }
    if (project.type === undefined || project.type.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Type Error', text: '无效的项目类型' })
      return false
    }
    if (project.fund === undefined || project.fund.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Fund Error', text: '无效的经费' })
      return false
    }
    if (project.start_date === undefined || !project.start_date) {
      messageAPI.error({ title: 'Start Date Error', text: '无效的开始日期' })
      return
    }
    if (project.end_date === undefined || !project.end_date) {
      messageAPI.error({ title: 'End Date Error', text: '无效的结束日期' })
      return
    }
    if (project.project_number === undefined || project.project_number.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Project Number Error', text: '无效的项目号' })
      return false
    }
    if (project.status === undefined || project.status.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Status Error', text: '无效的项目状态' })
      return false
    }
    let ownPaper = false
    mutipleSelectLeadersValue.forEach((user) => {
      if (user.user_id === storgeUtils.getUser().user_id) {
        ownPaper = true
      }
    })
    if (!ownPaper) {
      messageAPI.warning({ text: '若上传项目，您必须是该项目的参与者之一' })
      return false
    }
    return true
  }
  const fetchData = async () => {
    setMutipleSelectUsers((await supabase.from('user_student').select('user_id,name,email')).data
      .concat((await supabase.from('user_teacher').select('user_id,name,email')).data))
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
          <Link to={'/projects'} style={{
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
            Projects
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
            Create project
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
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setProject({ ...project, title: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Leader Name</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setProject({ ...project, leader: e.target.value }) }} />
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
                      <TextField {...params} label='System Leader' helperText="Choose users to add" inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}>
                      </TextField>
                    )}
                    isOptionEqualToValue={(option, value) => option.email === value.email}
                    value={mutipleSelectParticipantsValue} onChange={handleChangeMutipleSelectLeaders}
                  />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Participants Name</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setProject({ ...project, participant: e.target.value }) }} />
                  </FormControl>
                  <styleAutoComplete size="small" disableCloseOnSelect fullWidth multiple options={mutipleSelectUsers} getOptionLabel={(option) => option.name}
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
                      <TextField {...params} label='System Participant' helperText="Choose users to add" inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}>
                      </TextField>
                    )}
                    isOptionEqualToValue={(option, value) => option.email === value.email}
                    value={mutipleSelectLeadersValue} onChange={handleChangeMutipleSelectParticipants}
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
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setProject({ ...project, type: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Fund</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setProject({ ...project, fund: e.target.value })} />
                  </FormControl>
                  <StyledDatePicker label='Start Date' format="YYYY-MM-DD" onChange={(newValue) => { setProject({ ...project, start_date: newValue }) }} />
                  <StyledDatePicker label='End Date' format="YYYY-MM-DD" onChange={(newValue) => { setProject({ ...project, end_date: newValue }) }} />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Project Number</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setProject({ ...project, project_number: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Status</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setProject({ ...project, status: e.target.value })} />
                  </FormControl>

                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <FileUploader uploadPath={PROJECT_STORAGE_PATH} object={project} setObject={setProject} checkObject={checkProject} tableName="project" />
              </Grid>
            </Grid>
          </Stack>

        </Paper>
      </Stack>
    </Container>
  )
}