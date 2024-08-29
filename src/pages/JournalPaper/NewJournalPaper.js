import { Container, Stack, Typography, Box, Paper, Grid, FormControl, InputLabel, TextField } from "@mui/material"
import WestIcon from '@mui/icons-material/West';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { JOURNAL_PAPER_STORAGE_PATH } from "@/config";
import { fontFamily } from "@/utils/commonUtils";
import dayjs from "dayjs";
import storgeUtils from "@/utils/storageUtils";
import StyledAutocomplete from "@/components/Input/StyledAutocomplete";
import StyledDatePicker from "@/components/Input/StyledDatePicker";
import FileUploader from "@/components/FileUploader";
import { messageAPI } from "@/components/Message";
import { BootstrapInputBase } from "@/components/Input/BootstrapInput";
export default function NewJournalPaper() {
  const [paper, setPaper] = useState({ publication_date: dayjs('') })
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
  const checkPaper = () => {
    if (paper.title === undefined || paper.title.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Title Error', text: '无效的论文题目' })
      return false
    }
    if (paper.author === undefined || paper.author.trim().split(" ").length === 0 ||
      !(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(paper.author.replace(/,/g, '').replace(/ /g, '')))) {
      messageAPI.error({ title: 'Author Name Error', text: '无效的作者名称' })
      return false
    }
    if (paper.journal === undefined || paper.journal.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Journal Error', text: '无效的会议名称' })
      return false
    }
    if (paper.subject === undefined || paper.subject.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Subject Error', text: '无效的领域名称' })
      return false
    }
    if (paper.publication_date === undefined || !paper.publication_date) {
      messageAPI.error({ title: 'Publication Date Error', text: '无效的发表日期' })
      return
    }
    if (paper.keyword === undefined || paper.keyword.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'Keyword Error', text: '无效的关键字' })
      return false
    }
    if (paper.doi === undefined || paper.doi.trim().split(" ").length === 0) {
      messageAPI.error({ title: 'DOI Error', text: '无效的doi' })
      return false
    }
    if (participationType === undefined || participationType === null || participationType.trim().split(" ").length === 0) {
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
      messageAPI.warning({ text: '若上传论文，您必须是该论文的作者之一' })
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
          <Link to={'/achievements/journal-papers'} style={{
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
            Journal Papers
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
            Create journal paper
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
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setPaper({ ...paper, title: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Author Name</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => { setPaper({ ...paper, author: e.target.value }) }} />
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
                      <TextField {...params} label='System Author' helperText="Choose users to add" inputProps={{
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
                    }} htmlFor="bootstrap1" shrink>Journal</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setPaper({ ...paper, journal: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Subject</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setPaper({ ...paper, subject: e.target.value })} />
                  </FormControl>
                  <StyledDatePicker label='Publication Date' format="YYYY-MM-DD" onChange={(newValue) => { setPaper({ ...paper, publication_date: newValue }); console.log(paper) }} />
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>Keywords</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setPaper({ ...paper, keyword: e.target.value })} />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#212636',
                      '&.MuiInputLabel-root.Mui-focused': {
                        color: '#635bff'
                      }
                    }} htmlFor="bootstrap1" shrink>DOI</InputLabel>
                    <BootstrapInputBase id="bootstrap1" onChange={(e) => setPaper({ ...paper, doi: e.target.value })} />
                  </FormControl>
                  <styleAutoComplete size="small" disableCloseOnSelect fullWidth multiple options={mutipleSelectProjects} getOptionLabel={(option) => option.title}
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
                    }} htmlFor="bootstrap1" shrink>Abstract</InputLabel>
                    <BootstrapInputBase multiline maxRows={100} id="bootstrap1" onChange={(e) => setPaper({ ...paper, abstract: e.target.value })} />
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
                <FileUploader uploadPath={JOURNAL_PAPER_STORAGE_PATH} object={paper} setObject={setPaper} checkObject={checkPaper} tableName="journal_paper" joinTableName="user_journal_paper"
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