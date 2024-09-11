import { Container, Stack, Typography, Button, IconButton, Box, Avatar, CardHeader, Divider, Chip, Grid, Table, TableHead, TableBody, TableRow } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fontFamily, getCurrentDate, stringAvatar } from "@/utils/commonUtils";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import UserStatusChip from "@/components/StyledChip/UserStatusChip";
import { useEffect, useState } from "react";
import supabase, { USER_TYPE } from "@/config";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
import StyledEditTextField from "@/components/Input/StyledEditTextField";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ReturnLink, { StyledLink } from "@/components/ReturnLink";
import { ContentButton } from "@/components/StyledButton/ContentButton";
import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import { BlockPaper } from "@/components/StyledPaper/BlockPaper";
import BlockTableHeadCell from "@/components/Table/StyledTableHeadCell/BlockTableHeadCell";
import BlockTableBodyCell from "@/components/Table/StyledTableBodyCell/BlockTableBodyCell";
import storageUtils from "@/utils/storageUtils";
export default function TeacherDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  //判断用户是否可以编辑该信息，此处逻辑规则有些松
  const [canUpdate, setCanUpdate] = useState(storageUtils.getUser().user_id + '' === id)
  const [editUser, setEditUser] = useState(null)
  const userType = useLocation().pathname.includes('students') ? USER_TYPE.STUDNET : USER_TYPE.TEACHER
  const [achievements, setAchievements] = useState([])
  const [projects, setProjects] = useState([])
  const [projectParticipationType, setProjectParticipationType] = useState([])
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchData = async () => {
    const userData = await supabase.from('user_teacher').select().eq('user_id', id)
    if (userData.data && userData.data.length > 0) {
      setUser(userData.data[0])
      setEditUser(userData.data[0])
    }
    else return
    const newAchievements = []
    const conferencePaper = await supabase.from('user').select('conference_paper (*),user_conference_paper(participation_type)').eq('user_id', id)
    const journalPaper = await supabase.from('user').select('journal_paper (*),user_journal_paper(participation_type)').eq('user_id', id)
    const monograph = await supabase.from('user').select('monograph (*),user_monograph(participation_type)').eq('user_id', id)
    const award = await supabase.from('user').select('award (*),user_award(participation_type)').eq('user_id', id)
    const patent = await supabase.from('user').select('patent (*),user_patent(participation_type)').eq('user_id', id)
    const softwareCopyright = await supabase.from('user').select('software_copyright (*), user_software_copyright(participation_type)').eq('user_id', id)
    const projectsData = await supabase.from('user').select('project (*), user_project (participation_type)').eq('user_id', id)

    if (conferencePaper.data && conferencePaper.data.length > 0) {
      conferencePaper.data[0].conference_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '会议论文', 'role': conferencePaper.data[0].user_conference_paper[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (journalPaper.data && journalPaper.data.length > 0) {
      journalPaper.data[0].journal_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '期刊论文', 'role': conferencePaper.data[0].user_jounal_paper[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (monograph.data && monograph.data.length > 0) {
      monograph.data[0].monograph.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专著', 'role': monograph.data[0].user_monograph[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (award.data && award.data.length > 0) {
      award.data[0].award.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '获奖', 'role': award.data[0].user_award[index].participation_type, 'finishTime': item.presentation_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (patent.data && patent.data.length > 0) {
      patent.data[0].patent.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专利', 'role': patent.data[0].user_patent[index].participation_type, 'finishTime': item.authorization_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (softwareCopyright.data && softwareCopyright.data.length > 0) {
      softwareCopyright.data[0].software_copyright.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '软著', 'role': softwareCopyright.data[0].user_software_copyright[index].participation_type, 'finishTime': item.registration_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    setAchievements(newAchievements)
    setProjects(projectsData.data && projectsData.data.length > 0 ? projectsData.data[0].project : [])
    setProjectParticipationType(projectsData.data && projectsData.data.length > 0 ? projectsData.data[0].user_project : [])
  }
  const handleClickSaveChanges = async () => {
    if (canUpdate && editing) {
      setCanUpdate(false)
      const { data, error } = await supabase.from('user_teacher').update(editUser).eq('user_id', editUser.user_id).select()
      if (data && data.length > 0) {
        setUser(data[0])
        setEditUser(data[0])
        setEditing(false)
      }
      setCanUpdate(true)
    }

  }
  const handleCilckAchievmentDetail = (achievement) => {
    if (achievement.type === '会议论文') {
      navigate(`/achievements/conference-conferencePapers/details/${achievement.id}`)
      dispatch(menuChange('/achievements/conference-conferencePapers/details/'))
    }
    else if (achievement.type === '期刊论文') {
      navigate(`/achievements/journal-conferencePapers/details/${achievement.id}`)
      dispatch(menuChange('/achievements/journal-conferencePapers/details/'))
    }
    else if (achievement.type === '专著') {
      navigate(`/achievements/monographs/details/${achievement.id}`)
      dispatch(menuChange('/achievements/monographs/details/'))
    }
    else if (achievement.type === '专利') {
      navigate(`/achievements/patents/details/${achievement.id}`)
      dispatch(menuChange('/achievements/patents/details/'))
    }
    else if (achievement.type === '软著') {
      navigate(`/achievements/software-copyrights/details/${achievement.id}`)
      dispatch(menuChange('/achievements/software-copyrights/details/'))
    }
    else if (achievement.type === '获奖') {
      navigate(`/achievements/awards/details/${achievement.id}`)
      dispatch(menuChange('/achievements/awards/details/'))
    }

  }
  const handleClickProjectDetail = (project) => {
    navigate(`/projects/details/${project.id}`)
    dispatch('/projects/details')
  }
  useEffect(() => {
    fetchData()
  }, [])
  const showFields = ["姓名", "性别", "民族", "邮箱", "电话号码", "身份证号码", "工号", "生日", "毕业学校", "毕业专业", "职称", "入职日期", "办公地址", "研究兴趣", "状态"]
  const keys = ['name', 'gender', 'ethnicity', 'email', 'phone', 'identity_card', 'teacher_id', 'birthdate', 'university', 'department', 'professional_title', 'enrollment_date', 'office_address', 'research_interests', 'status']

  keys.filter((key) => {
    if (storageUtils.getUser().user_type === USER_TYPE.ADMIN) return key
    if (!canUpdate && !key.includes('identity_card') && !key.includes('user_id')) {
      return key
    }
    else if (canUpdate && !key.includes('user_id')) {
      return key
    }
  })
  if (!user) return (<></>)
  return (
    <Container maxWidth=''>
      <Stack sx={{
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* return students list */}
        <ReturnLink to={userType === USER_TYPE.STUDNET ? '/users/students' : '/users/teachers'} title={userType === USER_TYPE.STUDNET ? "Students" : "Teachers"} />
        <Stack gap={'32px'}>
          {/* detail header */}
          <Stack sx={{
            flexDirection: 'row'
          }}>
            {/* 头像和用户账户 */}
            <Stack sx={{
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: '24px'
            }}>
              {/* 头像 */}
              <Avatar {...stringAvatar(user?.name, '64px', '28px')} />
              {/* 姓名和邮箱 */}
              <Stack>
                <Stack sx={{
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <Typography sx={{
                    fontWeight: 500,
                    fontSize: '2rem',
                    margin: '0',
                    lineHeight: 1.2
                  }}>
                    {user.name}
                  </Typography>
                  <UserStatusChip status={user?.status} />
                </Stack>
                <Typography sx={{
                  fontWeight: 400,
                  fontSize: '1rem',
                  margin: '0',
                  lineHeight: 1.5,
                  color: '#667085'
                }}>
                  {user?.email}
                </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent={'center'}>
              <ContentButton endIcon={<KeyboardArrowDownIcon />}>
                Action
              </ContentButton>
            </Stack>
          </Stack>
          <Grid container spacing={4} sx={{ margin: '-16px' }}>
            {/* 用户个人信息 */}
            <Grid item lg={4} xs={12} sx={{ padding: '16px' }}>
              <Stack>
                <ContentPaper>
                  <CardHeader sx={{
                    padding: '32px 24px 16px'
                  }} avatar={
                    <Avatar sx={{ bgcolor: '#fff', color: 'black', boxShadow: '0px 3px 14px rgba(0, 0, 0, 0.08)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" fontSize="1.5rem">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                      </svg>
                    </Avatar>
                  } title="Basic details" titleTypographyProps={{ sx: { fontSize: '1.2rem', fontWeight: 500 } }}
                    action={<IconButton disabled={storageUtils.getUser().user_id !== user.user_id} onClick={() => setEditing(true)}><CreateOutlinedIcon /></IconButton>}
                  />
                  <Stack>
                    {
                      !editing
                        ?
                        keys.map((key, index) => {
                          return (
                            <div key={key}>
                              {index !== 0 && <Divider />}
                              <Box sx={{
                                alignItems: 'center',
                                display: 'grid',
                                gap: '8px',
                                gridTemplateColumns: '1fr',
                                padding: '12px 24px'
                              }}>
                                <Typography sx={{
                                  color: '#667085',
                                  lineHeight: 1.57,
                                  fontSize: '0.875rem',
                                  fontWeight: 400
                                }}>{showFields[index]}</Typography>
                                <Typography sx={{
                                  color: '#212636',
                                  lineHeight: 1.57,
                                  fontSize: '0.9rem',
                                  fontWeight: 600
                                }}>{user[key] || <Chip component={'span'} label="Empty" color="warning" />}</Typography>
                              </Box>
                            </div>
                          )
                        })
                        :
                        <Stack sx={{
                          gap: '24px',
                          padding: '12px 24px'
                        }}>
                          <StyledEditTextField fullWidth label='姓名' value={editUser.name || ''}
                            onChange={(e) => { setEditUser({ ...editUser, name: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='性别' value={editUser.gender || ''}
                            onChange={(e) => { setEditUser({ ...editUser, gender: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='民族' value={editUser.ethnicity || ''}
                            onChange={(e) => { setEditUser({ ...editUser, ethnicity: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='邮箱' value={editUser.email || ''}
                            onChange={(e) => { setEditUser({ ...editUser, email: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='电话号码' value={editUser.phone || ''}
                            onChange={(e) => { setEditUser({ ...editUser, phone: e.target.value }) }} />
                          {storageUtils.getUser().user_id + '' === id && <StyledEditTextField fullWidth label='身份证号' value={editUser.identity_card || ''}
                            onChange={(e) => { setEditUser({ ...editUser, identity_card: e.target.value }) }} />
                          }
                          <DatePicker label='出生日期' format="YYYY-MM-DD" views={['year', 'month', 'day']} value={dayjs(editUser.birthdate)}
                            sx={{
                              'label': {
                                color: 'rgb(92 98 108)',
                                fontFamily: fontFamily,
                                '&:has(~ .MuiOutlinedInput-root.Mui-focused)': {
                                  color: '#635BFF',
                                },
                              },
                              'input': {
                                lineHeight: '24px',
                                fontSize: '14px',
                              },
                              '& ::placeholder': {
                                color: 'black',
                                fontWeight: 700,
                                fontSize: '14px',
                                fontFamily: '"Plus Jakarta Sans",sans-serif'
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderRadius: '8px',
                                  border: '1px solid #dcdfe4',
                                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)'
                                },
                                '&:hover': {
                                  '& fieldset': {
                                    border: '1px solid #dcdfe4'
                                  },
                                  backgroundColor: 'rgba(17, 25, 39, 0.04)'
                                },
                                '&.Mui-focused fieldset': {
                                  backgroundColor: 'transparent',
                                  borderColor: 'rgb(99, 102, 241)',
                                  borderWidth: '3px'
                                }
                              }
                            }}
                            onChange={(newValue) => setEditUser({ ...editUser, birthdate: newValue })} />
                          <StyledEditTextField fullWidth label='毕业学校' value={editUser.university || ''}
                            onChange={(e) => { setEditUser({ ...editUser, university: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='毕业专业' value={editUser.department || ''}
                            onChange={(e) => { setEditUser({ ...editUser, department: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='教师工号' value={editUser.teacher_id || ''}
                            onChange={(e) => { setEditUser({ ...editUser, teacher_id: e.target.value }) }} />
                          <StyledEditTextField fullWidth label='职称' value={editUser.professional_title || ''}
                            onChange={(e) => { setEditUser({ ...editUser, professional_title: e.target.value }) }} />
                          <DatePicker label='入职时间' format="YYYY-MM-DD" views={['year', 'month', 'day']}
                            value={dayjs(editUser.enrollment_date)}
                            sx={{
                              'label': {
                                color: 'rgb(92 98 108)',
                                fontFamily: fontFamily,
                                '&:has(~ .MuiOutlinedInput-root.Mui-focused)': {
                                  color: '#635BFF',
                                },
                              },
                              'input': {
                                lineHeight: '24px',
                                fontSize: '14px',
                              },
                              '& ::placeholder': {
                                color: 'black',
                                fontWeight: 700,
                                fontSize: '14px',
                                fontFamily: '"Plus Jakarta Sans",sans-serif'
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderRadius: '8px',
                                  border: '1px solid #dcdfe4',
                                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)'
                                },
                                '&:hover': {
                                  '& fieldset': {
                                    border: '1px solid #dcdfe4'
                                  },
                                  backgroundColor: 'rgba(17, 25, 39, 0.04)'
                                },
                                '&.Mui-focused fieldset': {
                                  backgroundColor: 'transparent',
                                  borderColor: 'rgb(99, 102, 241)',
                                  borderWidth: '3px'
                                }
                              }
                            }}
                            onChange={(newValue) => setEditUser({ ...editUser, enrollment_date: newValue })} />
                          <StyledEditTextField fullWidth label='办公地点' value={editUser.office_address || ''}
                            onChange={(e) => { setEditUser({ ...editUser, office_address: e.target.value }) }} />
                          <StyledEditTextField multiline maxRows={100} fullWidth label='研究兴趣' value={editUser.research_interests || ''}
                            onChange={(e) => { setEditUser({ ...editUser, research_interests: e.target.value }) }} />
                          <Grid container rowSpacing={3} columnSpacing={3}>
                            <Grid item xs={12} lg={12} md={6} >
                              <Button fullWidth sx={{
                                color: 'rgb(33, 43, 54)',
                                backgroundColor: '#fff',
                                textTransform: 'none',
                                borderRadius: '10px',
                                padding: '8px 16px',
                                border: '1px solid rgba(145, 158, 171, 0.32)',
                              }} onClick={() => {setEditing(false); setEditUser(user) }}>
                                Exit Editing
                              </Button>
                            </Grid>
                            <Grid item xs={12} lg={12} md={6}>
                              <Button fullWidth sx={{
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
                            </Grid>
                          </Grid>
                        </Stack>
                    }
                  </Stack>
                </ContentPaper>
              </Stack>
            </Grid>
            {/* 用户的成果及项目 */}
            <Grid item lg={8} xs={12} sx={{ padding: '16px' }}>
              <Stack sx={{
                gap: '32px'
              }}>
                {/* 用户参与获得的成果列表 */}
                <ContentPaper>
                  <CardHeader sx={{
                    padding: '32px 24px 16px'
                  }} avatar={
                    <Avatar sx={{ bgcolor: '#fff', color: '#434a60', boxShadow: '0px 3px 14px rgba(0, 0, 0, 0.08)' }}>
                      <WidgetsOutlinedIcon />
                    </Avatar>
                  } title="Achievement List" titleTypographyProps={{ sx: { fontSize: '1.2rem', fontWeight: 500 } }}
                  />
                  <Stack sx={{
                    padding: '16px 24px 40px'
                  }}>
                    <BlockPaper>
                      <Box sx={{ overflowX: 'auto', overflowY: 'auto' }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{
                              backgroundColor: '#f6f7fb'
                            }}>
                              <BlockTableHeadCell>
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
                                  <TableRow key={index} sx={{
                                    backgroundColor: '#fff'
                                  }}>
                                    <BlockTableBodyCell>
                                      <Stack>
                                        <StyledLink underline="hover" onClick={() => handleCilckAchievmentDetail(achievement)}>
                                          {achievement.name}
                                        </StyledLink>
                                        <Typography sx={{
                                          color: '#667085',
                                          fontWeight: 400,
                                          fontFamily: fontFamily,
                                          fontSize: '0.8rem',
                                          userSelect: 'none'
                                        }}>{achievement.role}</Typography>
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
                {/* 用户参加的项目列表 */}
                <ContentPaper>
                  <CardHeader sx={{
                    padding: '32px 24px 16px'
                  }} avatar={
                    <Avatar sx={{ bgcolor: '#fff', color: '#434a60', boxShadow: '0px 3px 14px rgba(0, 0, 0, 0.08)' }}>
                      <WidgetsOutlinedIcon />
                    </Avatar>
                  } title="Projects" titleTypographyProps={{ sx: { fontSize: '1.2rem', fontWeight: 500 } }}
                  />
                  <Stack sx={{
                    padding: '16px 24px 40px'
                  }}>
                    <BlockPaper>
                      <Box sx={{ overflowX: 'auto', overflowY: 'auto' }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{
                              backgroundColor: '#f6f7fb'
                            }}>
                              <BlockTableHeadCell>
                                项目名称
                              </BlockTableHeadCell>
                              <BlockTableHeadCell>
                                项目类型
                              </BlockTableHeadCell>
                              <BlockTableHeadCell>
                                担任角色
                              </BlockTableHeadCell>
                              <BlockTableHeadCell>
                                状态
                              </BlockTableHeadCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {projects &&
                              projects.map((project, index) => {
                                return (
                                  <TableRow key={index} sx={{
                                    backgroundColor: '#fff'
                                  }}>
                                    <BlockTableBodyCell>
                                      <StyledLink underline="hover" onClick={() => handleClickProjectDetail(project)}>
                                        {project.title}
                                      </StyledLink>
                                    </BlockTableBodyCell>
                                    <BlockTableBodyCell>
                                      {project.type}
                                    </BlockTableBodyCell>
                                    <BlockTableBodyCell>
                                      {projectParticipationType[index].participation_type}
                                    </BlockTableBodyCell>
                                    <BlockTableBodyCell>
                                      {project.end_date && project.end_date < getCurrentDate() ? '完成' : '进行中'}
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
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  )
}