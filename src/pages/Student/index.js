import { Box, Checkbox, Table, TableBody, TableHead, TablePagination, TableRow, Container, Stack, Typography, Tabs, Divider, Tab, Avatar } from "@mui/material"
import { CheckedBoxIcon, UnCheckedBoxIcon } from "@/components/Input/CheckBoxIcon";
import { useEffect, useState } from "react"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import supabase from "@/config";
import { useNavigate } from "react-router-dom";
import { fontFamily, sortby, stringAvatar } from "@/utils/commonUtils";
import ContentTableHeadCell from "@/components/Table/StyledTableHeadCell/ContentTableHeadCell";
import ContentTableBodyCell from "@/components/Table/StyledTableBodyCell/ContentTableBodyCell";
import UserStatusChip from "@/components/StyledChip/UserStatusChip";
import { messageAPI } from "@/components/Message";
import { useDispatch } from "react-redux";
import { exportStudents } from "@/action/ExportAction";
import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import { ExportButton } from "@/components/StyledButton/ExportButton";
import { ContentTitle } from "@/components/StyledTypography/ContentTitle";
import { ContentButton } from "@/components/StyledButton/ContentButton";
import { StyledLink } from "@/components/ReturnLink";
import SearchTextField from "@/components/Input/SearchTextField";
import SortByTextField from "@/components/Input/SortByTextFild";
import OrderTextField from "@/components/Input/OrderTextField";
import {
  onChangeChecked,
  onChangeOrder,
  onChangeSort,
  onClickDetail,
  onSearchEnter
} from "@/action/CommonAction";
export default function StudentContent() {
  const columns = [
    { show: '姓名', field: "name" },
    { show: '邮箱', field: "email" },
    { show: '手机号码', field: "phone" },
    { show: '毕业专业', field: "department" },
    { show: '毕业学校', field: "university" },
    { show: '入学日期', field: "enrollment_date" }
  ]
  const [datas, setDatas] = useState([])
  const [err, setErr] = useState(null)
  const [selected, setSelected] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('name')
  const [ascending, setAscending] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [datasCopy, setDatasCopy] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchData = async (fetchType) => {
    let result = null
    if (fetchType === 0) {
      result = await supabase
        .from('user_student')
        .select().order(sortBy, { ascending: ascending });
    }
    else if (fetchType === 1) {
      result = await supabase
        .from('user_student')
        .select().eq('status', 'Active')
    }
    else {
      result = await supabase
        .from('user_student')
        .select().eq('status', 'Graduated')
    }
    const { data, error } = result
    if (data) {
      setDatas(data)
      setDatasCopy(data)
      setErr(null)
      const newSelected = []
      data && data.forEach(() => {
        newSelected.push(false)
      })
      setSelected(newSelected)
    }
    if (error) {
      setErr(error)
      setDatas([])
      setDatasCopy([])
    }
  }
  useEffect(() => {
    fetchData(0);
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  const handleChangeTab = async (event, newTabValue) => {
    setTabValue(newTabValue)
    if (tabValue !== newTabValue) {
      fetchData(newTabValue)
    }
  }
  const handleChangeAllChecked = () => {
    setSelected(selected.map(() => { return !selectedAll }))
    setSelectedAll(!selectedAll)
  }
  const handleExport = () => {
    let selectedData = false
    selected.forEach((item) => {
      if (item) selectedData = true
    })
    if (!selectedData) messageAPI.info({ text: 'Please select at least one piece of data' })
    else {
      dispatch(exportStudents(datas.filter((data, index) => selected[index])))
    }
  }
  return (
    <Container maxWidth="">
      <Stack gap={'32px'}>
        <Stack sx={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Stack>
            <ContentTitle>
              Students
            </ContentTitle>
            <Stack sx={{ margin: '8px 0px 0px', flexDirection: 'row' }}>
              <ExportButton startIcon={<FileUploadOutlinedIcon />}>
                Import
              </ExportButton>
              <ExportButton startIcon={<FileDownloadOutlinedIcon />} onClick={handleExport}>
                Export
              </ExportButton>
            </Stack>
          </Stack>
          <Stack justifyContent={'center'}>
            <ContentButton startIcon={<AddIcon />}>
              Add
            </ContentButton>
          </Stack>
        </Stack>
        <ContentPaper>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs" sx={{ pr: '24px', pl: '24px' }}>
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="All" />
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="Active" />
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="Graduated" />
          </Tabs>
          <Divider sx={{ borderColor: 'rgb(242, 244, 247)' }} />
          {/* 查找和排序 */}
          <Stack sx={{
            display: 'flex',
            padding: '24px',
            gap: '16px',
            '@media(min-width:0px)': {
              flexDirection: 'column',
              alignItems: 'flex-start'
            },
            '@media (min-width:800px)': {
              flexDirection: 'row',
              alignItems: 'center'
            },
          }}>
            <Box sx={{
              flexGrow: 1,
              width: '100%'
            }}>
              <SearchTextField searchValue={searchValue} setSearchValue={setSearchValue} placeholder={"Search students"}
                handleSearchEnter={(e) => onSearchEnter(e, setDatas, datasCopy, 'name', searchValue)} />
            </Box>
            <SortByTextField onChangeSort={(e) => onChangeSort(e, setSortBy, datas, setDatas, ascending)}
              label={'Sort By'} defaultValue={sortBy} options={columns} />
            <OrderTextField onChangeOrder={(e) => onChangeOrder(e, setAscending, sortBy, setDatas, datas)}
              label={'Order'} defaultValue={ascending} />
          </Stack>
          {/* 数据表格 */}
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <ContentTableHeadCell sx={{
                    padding: '0px 0px 0px 16px'
                  }}>
                    <Checkbox checked={selectedAll} onChange={handleChangeAllChecked}
                      icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />} />
                  </ContentTableHeadCell>
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
                    入学时间
                  </ContentTableHeadCell>
                  <ContentTableHeadCell>
                    状态
                  </ContentTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas &&
                  datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => {
                      return (
                        <TableRow key={index} sx={{
                          ':hover': {
                            backgroundColor: selected[index + page * rowsPerPage] ? 'rgba(99, 102, 241, 0.08)'
                              : 'rgba(17, 25, 39, 0.04)'
                          },
                          backgroundColor: selected[index + page * rowsPerPage] && 'rgba(99, 102, 241, 0.08)'
                        }}>
                          <ContentTableBodyCell sx={{
                            padding: '0 0 0 16px'
                          }}>
                            <Checkbox checked={selected[index + page * rowsPerPage] || false}
                              onChange={() => onChangeChecked(index + page * rowsPerPage, selected, setSelected, setSelectedAll)}
                              icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />} />
                          </ContentTableBodyCell>
                          <ContentTableBodyCell>
                            <Stack sx={{
                              flexDirection: 'row',
                              gap: '8px',
                              alignItems: 'center'
                            }}>
                              <Avatar {...stringAvatar(data['name'], '40px', '16px')} />
                              <Stack>
                                <StyledLink underline="hover" onClick={() => onClickDetail(data, navigate, 'student')}>
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
                                fontFamily: fontFamily,
                                fontWeight: 500,
                                color: '#212636',
                                fontSize: '0.975rem',
                                lineHeight: 1.57
                              }}>{data.university}</Typography>
                              <Typography sx={{
                                color: '#667085',
                                fontWeight: 400,
                                fontFamily: fontFamily,
                                fontSize: '0.875rem',
                                lineHeight: 1.57
                              }}>{data.department}</Typography>
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
                              {data.enrollment_date}
                            </Typography>
                          </ContentTableBodyCell>
                          <ContentTableBodyCell>
                            <UserStatusChip status={data.status} />
                          </ContentTableBodyCell>
                        </TableRow>
                      )
                    })}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={datas ? datas.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ContentPaper>
      </Stack>
    </Container>
  )
}