import { fontFamily, stringAvatar } from "@/utils/commonUtils";
import { Stack, Link, styled, Container, Paper, Tabs, Tab, Box, TextField, Typography, Grid, Button, Table, TableHead, TableRow, TableBody, Avatar, Autocomplete, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useNavigate, useParams } from "react-router-dom";
import StyledEditTextField from "@/components/Input/StyledEditTextField";
import supabase, { USER_TYPE } from "@/config";
import ContentTableHeadCell from "@/components/Table/StyledTableHeadCell/ContentTableHeadCell";
import ContentTableBodyCell from "@/components/Table/StyledTableBodyCell/ContentTableBodyCell";
import UserStatusChip from "@/components/StyledChip/UserStatusChip";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReturnLink from "@/components/ReturnLink";
import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import TooltipButton from "@/components/StyledButton/TooltipButton";
import { messageAPI } from "@/components/Message";
import RemoveDialog from "@/components/RemoveDialog";
import storageUtils from "@/utils/storageUtils";
import { ContentButton } from "@/components/StyledButton/ContentButton";
export default function ConferencePaperDetail() {
  const StyledTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-flexContainer': {
      gap: '16px'
    }
  }))
  const StyledTab = styled(Tab)(({ theme }) => (
    {
      padding: '8px 10px',
      textTransform: 'none',
      color: 'rgb( 46 38 61 / 0.9)',
      fontFamily: fontFamily,
      borderRadius: '6px',
      minBlockSize: '38px',
      ':hover': {
        border: '0',
        color: '#8C57FF',
        backgroundColor: 'rgb( 140 87 255 / 0.16)',
        paddingBlockEnd: '0.5rem'
      },
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#8C57FF',
        boxShadow: '0px 2px 4px rgb( 46 38 61 / 0.16)'
      }
    }
  ))
  const navigate = useNavigate()
  //论文id
  const paperId = useParams()?.id
  //渲染论文信息的字段顺序
  const keys = []
  const [tabValue, setTabValue] = useState(0)
  //若有编辑权限，点击edit按钮后可以编辑信息
  const [infomarionEdit, setInfomationEdit] = useState(false)
  //是否有编辑论文信息权限，即论文作者之一
  const [canEdit, setCanEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publicationDate, setPublicationDate] = useState('')
  const [conference, setConference] = useState('')
  const [subject, setSubject] = useState('')
  const [doi, setDoi] = useState('')
  const [citaion, setCitation] = useState('')
  const [download, setDownload] = useState('')
  const [abstract, setAbstract] = useState('')
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [projects, setProjects] = useState([])
  const [editTitle, setEditTitle] = useState('')
  const dispatch = useDispatch()
  const [mutipleSelectDatas, setMutipleSelectDatas] = useState([])
  const [mutipleSelectValue, setMutipleSelectValue] = useState([])
  const [removeAuthorDialogOpen, setRemoveAuthorDialogOpen] = useState(false)
  const [deleteAuthor, setDeleteAuthor] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])
  //获取论文的信息，作者，相关项目
  const fetchData = async () => {
    const { data, error } = await supabase.from('conference_paper').select('*,user(user_id,user_type),project(*)').eq('id', paperId)
    if (data && data.length > 0) {
      setTitle(data[0].title)
      setEditTitle(data[0].title)
      setAuthor(data[0].author)
      setPublicationDate(data[0].publication_date)
      setConference(data[0].conference)
      setSubject(data[0].subject)
      setDoi(data[0].doi)
      setCitation(data[0].citation_number)
      setDownload(data[0].download_count)
      setAbstract(data[0].abstract)
      setProjects(data[0].project)
      const studentIds = []
      const teacherIds = []
      data[0].user.forEach((item) => {
        if (item.user_type == USER_TYPE.STUDNET) {
          studentIds.push(item.user_id)
        }
        else if (item.user_type == USER_TYPE.TEACHER) {
          teacherIds.push(item.user_id)
        }
        if (item.user_id === storageUtils.getUser().user_id) setCanEdit(true)
      })
      setMutipleSelectDatas((await supabase.from('user_student').select('user_id,name,email').not('user_id', 'in', '(' + studentIds.join(',') + ')')).data
        .concat((await supabase.from('user_teacher').select('user_id,name,email').not('user_id', 'in', '(' + teacherIds.join(',') + ')')).data))
      setStudents((await supabase.from('user_student').select().in('user_id', studentIds)).data)
      setTeachers((await supabase.from('user_teacher').select().in('user_id', teacherIds)).data)
    }
  }
  const handleAddAuthor = async () => {
    if (canEdit) {
      if (mutipleSelectValue.length === 0) {
        messageAPI.warning({ text: 'Please choose a piece of data at least!' })
      }
      else {
        const { data, err } = await supabase.from('user_conference_paper').insert(mutipleSelectValue.map((item) => {
          return { paper_id: paperId, user_id: item.user_id }
        }))
        if (err) {
          messageAPI.error({ text: err.message })
        }
        else {
          messageAPI.success({ text: 'Successfully added author.' })
        }
      }
    }
  }
  const handleChangeMutipleSelect = (event, newValue) => {
    setMutipleSelectValue(newValue)
  }
  const handleClickStudentDetail = (data) => {
    navigate(`/users/students/details/${data.user_id}`, { state: data })
    dispatch(menuChange('/users/students/details'))
  }
  const handleClickTeacherDetail = (data) => {
    navigate(`/users/teachers/details/${data.user_id}`, { state: data })
    dispatch(menuChange('/users/teachers/details'))
  }
  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  }
  //保存论文信息更改
  const handleClickSaveChanges = async () => {
    const paper = {}
    paper['title'] = title
    paper['author'] = author
    paper['publication_date'] = publicationDate
    paper['conference'] = conference
    paper['subject'] = subject
    paper['doi'] = doi
    paper['citation_number'] = citaion
    paper['download_count'] = download
    paper['abstract'] = abstract
    const { data, error } = await supabase.from('conference_paper').update(paper).eq('id', paperId)
    if (error) {
      messageAPI.error({ title: 'Update conference paper failed', text: error.message })
    }
    else {
      messageAPI.success({ text: 'Successfully update' })
    }
  }
  const handleClickProjectDetail = (id) => {
    navigate(`/projects/details/${id}`)
    dispatch(menuChange('/projects/details/'))
  }
  return (
    <Container maxWidth=''>
      <Stack sx={{
        flexDirection: 'column',
        gap: '24px'
      }}>
        <ReturnLink to={'/achievements/conference-papers'} title={'Conference Papers'} />
        <Stack sx={{
          gap: '32px'
        }}>
          <Stack sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* 论文详情页标题头---论文题目 */}
            <Typography sx={{
              fontWeight: 500,
              fontSize: '1.7rem',
              fontFamily: fontFamily
            }}>
              {title}
            </Typography>
            {canEdit &&
              <>
                <ContentButton onClick={()=>setDialogOpen(true)}>Withdraw</ContentButton>
                <RemoveDialog open={dialogOpen} setOpen={setDialogOpen} text={'您确定撤回该成果吗'}
                  invokeMethod={async () => {
                    const { error } = await supabase.from('conference_paper').delete().eq('id', paperId)
                    if (error) messageAPI.error({ text: error.message })
                    else messageAPI.success({ text: 'Delete successfully' })
                  }} />
              </>
            }
          </Stack>
          <Stack gap={'16px'}>
            <StyledTabs variant="scrollable" scrollButtons='auto'
              indicatorColor="#fff" value={tabValue} onChange={handleChangeTabValue}>
              <StyledTab icon={<FeedOutlinedIcon />} iconPosition="start" label='Basic Infomation' />
              <StyledTab icon={
                <PersonOutlinedIcon />
              }
                iconPosition="start" label='Paper Author' />
              <StyledTab iconPosition="start" icon={<EventOutlinedIcon />} label='Related Projects' />
            </StyledTabs>

            {tabValue == 0 &&
              <ContentPaper sx={{
                padding: '32px'
              }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Title' value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Author' value={author}
                      onChange={(e) => setAuthor(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Publication Date' value={publicationDate}
                      onChange={(e) => setPublicationDate(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Conference' value={conference}
                      onChange={(e) => setConference(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Subject' value={subject}
                      onChange={(e) => setSubject(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='DOI' value={doi}
                      onChange={(e) => setDoi(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Citation Number' value={citaion}
                      onChange={(e) => setCitation(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Download Number' value={download}
                      onChange={(e) => setDownload(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField multiline disabled={!(canEdit && infomarionEdit)} minRows={5} fullWidth label='Abstract' value={abstract}
                      onChange={(e) => setAbstract(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Stack sx={{ width: '100%' }} gap={'16px'}>
                        <Button disabled={!canEdit} onClick={() => canEdit && setInfomationEdit(!infomarionEdit)} sx={{
                          color: 'rgb(33, 43, 54)',
                          backgroundColor: '#fff',
                          textTransform: 'none',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          border: '1px solid rgba(145, 158, 171, 0.32)',
                        }} >
                          Edit Details
                        </Button>
                        <Button disabled={!canEdit} sx={{
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
                        }} onClick={handleClickSaveChanges}>
                          Save Changes
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </ContentPaper>
            }
            {tabValue == 1 &&
              <ContentPaper>
                <Stack sx={{
                  gap: '24px',
                  marginTop: '32px',
                  flexDirection: 'column'
                }}>
                  <Grid container columnSpacing={3} rowSpacing={3} sx={{
                    paddingLeft: '24px',
                    paddingRight: '24px'
                  }}>
                    <Grid item xs={12} sm={7} md={6}>
                      <Autocomplete disableCloseOnSelect fullWidth multiple options={mutipleSelectDatas} getOptionLabel={(option) => option.name}
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
                          <TextField {...params} label='Choose users to add' inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password'
                          }}>
                          </TextField>
                        )}
                        sx={{
                          '& .MuiInputBase-root': {
                            borderRadius: '12px'
                          },
                          'label:has(~ .MuiOutlinedInput-root.Mui-focused)': {
                            color: '#8C57FF',
                          },
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#8C57FF',
                              borderWidth: '2px'
                            }
                          },
                        }}
                        isOptionEqualToValue={(option, value) => option.email === value.email}
                        value={mutipleSelectValue} onChange={handleChangeMutipleSelect}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} md={3}>
                      <TooltipButton disabled={!canEdit} children={
                        <Button disabled={!canEdit} fullWidth sx={{
                          textTransform: 'none',
                          color: '#fff',
                          backgroundColor: '#8C57FF',
                          borderRadius: '12px',
                          padding: '8px 24px',
                          height: '100%',
                          maxWidth: '200px',
                          boxShadow: '0px 2px 4px rgb( 46 38 61 / 0.16)',
                          ':hover': {
                            backgroundColor: 'rgb(126, 78, 229)'
                          },
                        }} onClick={handleAddAuthor}>
                          Add Author
                        </Button>
                      }>

                      </TooltipButton>
                    </Grid>
                  </Grid>
                  <Box sx={{
                    overflowX: 'auto',
                    width: '100%'
                  }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            姓名
                          </ContentTableHeadCell>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            手机号码
                          </ContentTableHeadCell>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            类型
                          </ContentTableHeadCell>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            毕业院校
                          </ContentTableHeadCell>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            状态
                          </ContentTableHeadCell>
                          <ContentTableHeadCell sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                          </ContentTableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          teachers &&
                          teachers.map((data, index) => {
                            return (
                              <TableRow key={index}>
                                <ContentTableBodyCell>
                                  <Stack sx={{
                                    flexDirection: 'row',
                                    gap: '8px',
                                    alignItems: 'center'
                                  }}>
                                    <Avatar {...stringAvatar(data['name'], '40px', '16px')} />
                                    <Stack>
                                      <Link underline="hover" sx={{
                                        fontFamily: 'Microsoft Yahei, Heiti SC',
                                        fontWeight: 500,
                                        color: '#212636',
                                        fontSize: '1rem',
                                        lineHeight: 1.57,
                                        cursor: 'pointer',
                                        width: 'fit-content'
                                      }} onClick={() => handleClickTeacherDetail(data)}>
                                        {data.name}
                                      </Link>
                                      <Typography sx={{
                                        color: '#667085',
                                        fontWeight: 400,
                                        fontFamily: fontFamily,
                                        fontSize: '0.875rem',
                                        lineHeight: 1.57
                                      }}>{data.email}</Typography>
                                    </Stack>
                                  </Stack>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Typography sx={{
                                    fontFamily: 'Gaoel',
                                    fontWeight: 400,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.57,
                                    letterSpacing: '0.5px'
                                  }}>
                                    {data.phone}
                                  </Typography>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Typography sx={{
                                    fontFamily: 'Microsoft Yahei, Heiti SC',
                                    fontWeight: 400,
                                    fontSize: '0.975rem',
                                    lineHeight: 1.57,
                                  }}>
                                    {data.professional_title}
                                  </Typography>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Stack>
                                    <Typography sx={{
                                      fontFamily: 'Microsoft Yahei, Heiti SC',
                                      fontWeight: 500,
                                      color: '#212636',
                                      fontSize: '0.975rem',
                                      lineHeight: 1.57
                                    }}>{data.university}</Typography>
                                    <Typography sx={{
                                      color: '#667085',
                                      fontWeight: 400,
                                      fontFamily: 'Microsoft Yahei, Heiti SC',
                                      fontSize: '0.875rem',
                                      lineHeight: 1.57
                                    }}>{data.department}</Typography>
                                  </Stack>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <UserStatusChip status={data.status} />
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Tooltip title="remove this user">
                                    <IconButton onClick={() => {
                                      setRemoveAuthorDialogOpen(true);
                                      setDeleteAuthor({
                                        ...deleteAuthor, name: data.name, id: data.user_id,
                                        userType: USER_TYPE.TEACHER, email: data.email
                                      })
                                    }}>
                                      <CancelOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                </ContentTableBodyCell>
                              </TableRow>
                            )
                          })
                        }
                        {
                          students &&
                          students.map((data, index) => {
                            return (
                              <TableRow key={index}>
                                <ContentTableBodyCell>
                                  <Stack sx={{
                                    flexDirection: 'row',
                                    gap: '8px',
                                    alignItems: 'center'
                                  }}>
                                    <Avatar {...stringAvatar(data['name'], '40px', '16px')} />
                                    <Stack>
                                      <Link underline="hover" sx={{
                                        fontFamily: 'Microsoft Yahei, Heiti SC',
                                        fontWeight: 500,
                                        color: '#212636',
                                        fontSize: '1rem',
                                        lineHeight: 1.57,
                                        cursor: 'pointer',
                                        width: 'fit-content'
                                      }} onClick={() => handleClickStudentDetail(data)}>
                                        {data.name}
                                      </Link>
                                      <Typography sx={{
                                        color: '#667085',
                                        fontWeight: 400,
                                        fontFamily: fontFamily,
                                        fontSize: '0.875rem',
                                        lineHeight: 1.57
                                      }}>{data.email}</Typography>
                                    </Stack>
                                  </Stack>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Typography sx={{
                                    fontFamily: 'Gaoel',
                                    fontWeight: 400,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.57,
                                    letterSpacing: '0.5px'
                                  }}>
                                    {data.phone}
                                  </Typography>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Typography sx={{
                                    fontFamily: 'Microsoft Yahei, Heiti SC',
                                    fontWeight: 400,
                                    fontSize: '0.975rem',
                                    lineHeight: 1.57,
                                  }}>
                                    {data.graduate_type}
                                  </Typography>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Stack>
                                    <Typography sx={{
                                      fontFamily: 'Microsoft Yahei, Heiti SC',
                                      fontWeight: 500,
                                      color: '#212636',
                                      fontSize: '0.975rem',
                                      lineHeight: 1.57
                                    }}>{data.university}</Typography>
                                    <Typography sx={{
                                      color: '#667085',
                                      fontWeight: 400,
                                      fontFamily: 'Microsoft Yahei, Heiti SC',
                                      fontSize: '0.875rem',
                                      lineHeight: 1.57
                                    }}>{data.department}</Typography>
                                  </Stack>
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <UserStatusChip status={data.status} />
                                </ContentTableBodyCell>
                                <ContentTableBodyCell>
                                  <Tooltip title="remove this user">
                                    <IconButton onClick={
                                      () => {
                                        setRemoveAuthorDialogOpen(true);
                                        setDeleteAuthor({
                                          ...deleteAuthor, name: data.name, id: data.user_id,
                                          userType: USER_TYPE.STUDNET, email: data.email
                                        })
                                      }}>
                                      <CancelOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                </ContentTableBodyCell>
                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                  </Box>
                </Stack>
              </ContentPaper>
            }
            {tabValue == 2 &&
              <Stack gap={'32px'}>
                {
                  projects && projects.map((project) => {
                    return (
                      <Paper key={project.id} sx={{
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
                        overflow: 'hidden'
                      }}>
                        <Stack sx={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                          <Stack sx={{
                            flexDirection: 'column'
                          }}>
                            <Link underline="hover" sx={{
                              fontFamily: 'Microsoft Yahei, Heiti SC',
                              fontWeight: 500,
                              color: '#212636',
                              fontSize: '1.125rem',
                              lineHeight: 1.57,
                              cursor: 'pointer',
                              width: 'fit-content'
                            }} onClick={() => handleClickProjectDetail(project.id)}>
                              {project.title}
                            </Link>
                            <Typography sx={{
                              color: '#667085',
                              fontWeight: 400,
                              fontFamily: fontFamily,
                              fontSize: '0.975rem',
                              lineHeight: 1.57
                            }}>{project.type}</Typography>
                          </Stack>
                          <Typography sx={{
                            fontFamily: 'Microsoft Yahei, Heiti SC',
                            fontWeight: 500,
                            color: '#212636',
                            fontSize: '1rem',
                            lineHeight: 1.57,
                            cursor: 'pointer',
                            width: 'fit-content'
                          }}>进行中</Typography>
                        </Stack>
                      </Paper>
                    )
                  })
                }
              </Stack>
            }
          </Stack>
        </Stack>
      </Stack>
      <RemoveDialog open={removeAuthorDialogOpen} setOpen={setRemoveAuthorDialogOpen} text={"您确定将 <" + deleteAuthor.name + "> 从成果作者中删除吗？"} invokeMethod={async () => {
        const { data, error } = await supabase.from('user_conference_paper').delete().eq("user_id", deleteAuthor.id).eq("paper_id", paperId)
        if (error) {
          messageAPI.error({ tconference_ext: error.message })
        }
        else {
          if (deleteAuthor.userType === USER_TYPE.STUDNET) {
            setStudents(students.filter(item => item.user_id !== deleteAuthor.id))
          }
          else {
            setTeachers(teachers.filter(item => item.user_id !== deleteAuthor.id))
          }
          const dd = mutipleSelectDatas
          dd.push({ 'user_id': deleteAuthor.id, 'name': deleteAuthor.name, 'email': deleteAuthor.email })
          setMutipleSelectDatas(dd)
          messageAPI.success({ text: 'Successfully deleted!' })
        }
      }} />
    </Container >
  )
}