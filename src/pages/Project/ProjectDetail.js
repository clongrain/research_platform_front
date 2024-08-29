import { fontFamily, stringAvatar } from "@/utils/commonUtils";
import { Stack, Link, styled, Container, Paper, Tabs, Tab, Box, TextField, Typography, Grid, Button, Table, TableHead, TableRow, TableBody, Avatar, Autocomplete, IconButton, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import WestIcon from '@mui/icons-material/West';
import { useNavigate, useParams } from "react-router-dom";
import StyledEditTextField from "@/components/Input/StyledEditTextField";
import supabase, { PAPER_TYPE, USER_TYPE } from "@/config";
import ContentTableHeadCell from "@/components/Table/StyledTableHeadCell/ContentTableHeadCell";
import ContentTableBodyCell from "@/components/Table/StyledTableBodyCell/ContentTableBodyCell";
import UserStatusChip from "@/components/StyledChip/UserStatusChip";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReturnLink, { StyledLink } from "@/components/ReturnLink";
import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import { BlockPaper } from "@/components/StyledPaper/BlockPaper";
import BlockTableHeadCell from "@/components/Table/StyledTableHeadCell/BlockTableHeadCell";
import BlockTableBodyCell from "@/components/Table/StyledTableBodyCell/BlockTableBodyCell";
import storageUtils from "@/utils/storageUtils";
export default function ProjectDetail() {
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
  //id
  const projectId = useParams()?.id
  const [tabValue, setTabValue] = useState(0)
  //若有编辑权限，点击edit按钮后可以编辑信息
  const [infomarionEdit, setInfomationEdit] = useState(false)
  //是否有编辑信息权限，即作者之一
  const [canEdit, setCanEdit] = useState(false)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [project, setProject] = useState({})
  const [editProject, setEditProject] = useState({})
  const dispatch = useDispatch()
  const [mutipleSelectDatas, setMutipleSelectDatas] = useState([])
  const [mutipleSelectValue, setMutipleSelectValue] = useState([])
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  //获取论文的信息，作者，相关项目
  const fetchData = async () => {
    const newAchievements = []
    const { data, error } = await supabase.from('project').select('*,user(user_id,user_type)').eq('id', projectId)
    const conferencePaper = await supabase.from('project').select('conference_paper (id,title,conference,publication_date)').eq('id', projectId)
    const journalPaper = await supabase.from('project').select('journal_paper (id,title,journal,publication_date)').eq('id', projectId)
    const monograph = await supabase.from('project').select('monograph (id,title,publisher,publication_date)').eq('id', projectId)
    const award = await supabase.from('project').select('award (id,title,level,presentation_date)').eq('id', projectId)
    const patent = await supabase.from('project').select('patent (id,title,domain,authorization_date)').eq('id', projectId)
    const softwareCopyright = await supabase.from('project').select('software_copyright (id,title,type,registration_date)').eq('id', projectId)
    if (conferencePaper.data && conferencePaper.data.length > 0) {
      conferencePaper.data[0].conference_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '会议论文', 'remark': item.conference, 'finishTime': item.publication_date }
        newAchievements.push(achievement)
      })
    }
    if (journalPaper.data && journalPaper.data.length > 0) {
      journalPaper.data[0].journal_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '期刊论文', 'remark': item.journal, 'finishTime': item.publication_date }
        newAchievements.push(achievement)
      })
    }
    if (monograph.data && monograph.data.length > 0) {
      monograph.data[0].monograph.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专著', 'remark': item.publisher, 'finishTime': item.publication_date }
        newAchievements.push(achievement)
      })
    }
    if (award.data && award.data.length > 0) {
      award.data[0].award.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '获奖', 'remark': item.level, 'finishTime': item.presentation_date }
        newAchievements.push(achievement)
      })
    }
    if (patent.data && patent.data.length > 0) {
      patent.data[0].patent.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专利', 'remark': item.domain, 'finishTime': item.authorization_date }
        newAchievements.push(achievement)
      })
    }
    if (softwareCopyright.data && softwareCopyright.data.length > 0) {
      softwareCopyright.data[0].software_copyright.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '软著', 'remark': item.type, 'finishTime': item.registration_date }
        newAchievements.push(achievement)
      })
    }
    if (data && data.length > 0) {
      setProject(data[0])
      setEditProject(data[0])
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
      setMutipleSelectDatas((await supabase.from('user_student').select('user_id,name,email')).data
        .concat((await supabase.from('user_teacher').select('user_id,name,email')).data))
      setStudents((await supabase.from('user_student').select().in('user_id', studentIds)).data)
      setTeachers((await supabase.from('user_teacher').select().in('user_id', teacherIds)).data)
    }
    setAchievements(newAchievements)
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
  const handleClickSaveChanges = () => {

  }
  const handleClickAchievementDetail = (type, id) => {
    navigate(`/achievements/projects/details/${id}`)
    dispatch(menuChange('/achievements/projects/details/'))
  }
  return (
    <Container maxWidth=''>
      <Stack sx={{
        flexDirection: 'column',
        gap: '24px'
      }}>
        <ReturnLink to={'/projects'} title={'Projects'} />
        <Stack sx={{
          gap: '32px'
        }}>
          {/* 论文详情页标题头---论文题目 */}
          <Typography sx={{
            fontWeight: 500,
            fontSize: '1.5rem',
            fontFamily: fontFamily
          }}>
            {project.title}
          </Typography>
          <Stack gap={'16px'}>
            <StyledTabs variant="scrollable" scrollButtons='auto'
              indicatorColor="#fff" value={tabValue} onChange={handleChangeTabValue}>
              <StyledTab icon={<FeedOutlinedIcon />} iconPosition="start" label='Basic Infomation' />
              <StyledTab icon={<PersonOutlinedIcon />} iconPosition="start" label='Project Participants' />
              <StyledTab iconPosition="start" icon={<EventOutlinedIcon />} label='Achievement Output' />
            </StyledTabs>

            {tabValue == 0 &&
              <ContentPaper sx={{
                padding: '32px',
              }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Title' value={editProject.title || ''}
                      onChange={(e) => setEditProject({ ...editProject, title: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Type' value={editProject.type || ''}
                      onChange={(e) => setEditProject({ ...editProject, type: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Project Number' value={editProject.project_number || ''}
                      onChange={(e) => setEditProject({ ...editProject, project_number: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Start Date' value={editProject.start_date || ''}
                      onChange={(e) => setEditProject({ ...editProject, start_date: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='End Date' value={editProject.end_date || ''}
                      onChange={(e) => setEditProject({ ...editProject, end_date: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Leader' value={editProject.leader || ''}
                      onChange={(e) => setEditProject({ ...editProject, leader: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Core Memeber' value={editProject.core_member || ''}
                      onChange={(e) => setEditProject({ ...editProject, core_member: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledEditTextField fullWidth disabled={!(canEdit && infomarionEdit)} label='Fund' value={editProject.fund || ''}
                      onChange={(e) => setEditProject({ ...editProject, fund: e.target.value })} />
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
                        }} >
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
                      <Button fullWidth sx={{
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
                      }}>
                        Add Authors
                      </Button>
                    </Grid>
                  </Grid>
                  <Box sx={{
                    overflowX: 'auto',
                    width: '100%'
                  }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <ContentTableHeadCell>
                            姓名
                          </ContentTableHeadCell>
                          <ContentTableHeadCell>
                            手机号码
                          </ContentTableHeadCell>
                          <ContentTableHeadCell>
                            类型
                          </ContentTableHeadCell>
                          <ContentTableHeadCell>
                            毕业院校
                          </ContentTableHeadCell>
                          <ContentTableHeadCell>
                            状态
                          </ContentTableHeadCell>
                          <ContentTableHeadCell />
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
                                      <StyledLink underline="hover" sx={{
                                        fontFamily: 'Microsoft Yahei, Heiti SC'
                                      }} onClick={() => handleClickTeacherDetail(data)}>
                                        {data.name}
                                      </StyledLink>
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
                                  <IconButton><CancelOutlinedIcon /></IconButton>
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
                                      <StyledLink underline="hover" sx={{
                                        fontFamily: 'Microsoft Yahei, Heiti SC'
                                      }} onClick={() => handleClickStudentDetail(data)}>
                                        {data.name}
                                      </StyledLink>
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
                                  <IconButton><CancelOutlinedIcon /></IconButton>
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
              <ContentPaper>
                <CardHeader>

                </CardHeader>
                <Stack sx={{
                  padding: '16px 24px 40px'
                }}>
                  <BlockPaper>
                    <Box sx={{ overflowX: 'auto', overflowY: 'auto' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <BlockTableHeadCell sx={{
                              paddingLeft: '24px'
                            }}>
                              名称
                            </BlockTableHeadCell>
                            <BlockTableHeadCell>
                              类型
                            </BlockTableHeadCell>
                            <BlockTableHeadCell>
                              获取时间
                            </BlockTableHeadCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {achievements &&
                            achievements.map((achievement, index) => {
                              return (
                                <TableRow key={index}>
                                  <BlockTableBodyCell sx={{
                                    paddingLeft: '24px'
                                  }}>
                                    <Stack>
                                      <StyledLink underline="hover">
                                        {achievement.name}
                                      </StyledLink>
                                      <Typography sx={{
                                        color: '#667085',
                                        fontWeight: 400,
                                        fontFamily: fontFamily,
                                        fontSize: '0.875rem',
                                        lineHeight: 1.57
                                      }}>
                                        {achievement.remark}
                                      </Typography>
                                    </Stack>
                                  </BlockTableBodyCell>
                                  <BlockTableBodyCell>
                                    {achievement.type}
                                  </BlockTableBodyCell>
                                  <BlockTableBodyCell>
                                    {achievement.finishTime}
                                  </BlockTableBodyCell>
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    </Box>
                  </BlockPaper>
                </Stack>
              </ContentPaper>
            }
          </Stack>
        </Stack>
      </Stack>
    </Container >
  )
}