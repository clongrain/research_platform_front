import { Container, Stack, Typography, Box, Paper, Grid, FormControl, InputLabel, TextField } from "@mui/material"
import WestIcon from '@mui/icons-material/West';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { AWARD_STORAGE_PATH } from "@/config";
import { fontFamily } from "@/utils/commonUtils";
import dayjs from "dayjs";
import storgeUtils from "@/utils/storageUtils";
import StyledAutocomplete from "@/components/Input/StyledAutocomplete";
import StyledDatePicker from "@/components/Input/StyledDatePicker";
import FileUploader from "@/components/FileUploader";
import { BootstrapInputBase } from "@/components/Input/BootstrapInput";
import { messageAPI } from "@/components/Message";
export default function NewAward() {
  const [award, setAward] = useState({ presentation_date: dayjs('') })
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
  const checkAward = () => {
    if (award.title === undefined || award.title.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Title Error', text: '无效的奖项名称' })
      return false
    }
    if (award.prizewinner === undefined || award.prizewinner.trim().split(" ").length === 0 ||
      !(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(award.prizewinner.replace(/,/g, '').replace(/ /g, '')))) {
      messageAPI.error({ title: 'Prizewinnner Name Error', text: '无效的获奖人名称' })
      return false
    }
    if (award.awarding_unit === undefined || award.awarding_unit.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Awarding Unit Error', text: '无效的颁奖单位名称' })
      return false
    }
    if (award.presentation_date === undefined || !award.presentation_date) {
      messageAPI.error({ title: 'Presentation Date Error', text: '无效的获奖日期' })
      return
    }
    if (award.level === undefined || award.level.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Level Error', text: '无效的奖项级别' })
      return false
    }
    if (award.reason === undefined || award.reason.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Reason Error', text: '无效的reason' })
      return false
    }
    if (participationType === undefined || participationType === null || participationType.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Participation Type Error', text: '无效的参与类型' })
      return false
    }
    let ownAward = false
    mutipleSelectUsersValue.forEach((user) => {
      if (user.user_id === storgeUtils.getUser().user_id) {
        ownAward = true
      }
    })
    if (!ownAward) {
      messageAPI.warning({ text: '若上传获奖成果，您必须是该奖项的获得者之一' })
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
        <Box>
          <Link to={'/achievements/awards'} style={{
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
            Awards
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
            Create award
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
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setAward({ ...award, title: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Prizewinnner Name</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setAward({ ...award, prizewinner: e.target.value }) }} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Level</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setAward({ ...award, level: e.target.value }) }} />
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
                      <TextField {...params} label='System Prizewinner' helperText="Choose users to add" inputProps={{
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
                    }} htmlFor="bootstrap1" shrink>Awarding Unit</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setAward({ ...award, awarding_unit: e.target.value })} />
                  </FormControl>
                  <StyledDatePicker label='Presentation Date' format="YYYY-MM-DD" onChange={(newValue) => { setAward({ ...award, presentation_date: newValue }) }} />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Reason</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setAward({ ...award, reason: e.target.value })} />
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
                    }} htmlFor="bootstrap1" shrink>Your Participation Type</InputLabel>
                    <BootstrapInputBase multiline maxRows={100} id="bootstrap1" onChange={(e) => setParticipationType(e.target.value)} />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <FileUploader uploadPath={AWARD_STORAGE_PATH} object={award} setObject={setAward} checkObject={checkAward} tableName="award" joinTableName="user_award"
                  joinTableData={mutipleSelectUsersValue.map((user) => {
                    if (user.user_id === storgeUtils.getUser().user_id) {
                      return { user_id: user.user_id, participation_type: participationType }
                    }
                    else return { user_id: user.user_id, participation_type: null }
                  })} projects={mutipleSelectProjectsValue} />
              </Grid>
            </Grid>
          </Stack>

        </Paper>
      </Stack>
    </Container>
  )
}