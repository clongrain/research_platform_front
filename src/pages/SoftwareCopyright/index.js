import { IconButton, Box, Checkbox, Table, TableBody, TableHead, TablePagination, TableRow, Container, Stack, Typography, Tabs, Divider, Tab, Avatar, AvatarGroup } from "@mui/material"
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
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useDispatch } from "react-redux";
import { messageAPI } from "@/components/Message";
import { exportSoftwareCopyrights } from "@/action/ExportAction";
import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import { ExportButton } from "@/components/StyledButton/ExportButton";
import { ContentTitle } from "@/components/StyledTypography/ContentTitle";
import { ContentButton } from "@/components/StyledButton/ContentButton";
import { StyledLink } from "@/components/ReturnLink";
import SearchTextField from "@/components/Input/SearchTextField";
import SortByTextField from "@/components/Input/SortByTextFild";
import OrderTextField from "@/components/Input/OrderTextField";
import { downloadStorageFile } from "@/action/DownloadFileAction";
export default function SoftwareCopyrightContent() {
  const columns = [
    { show:'名称',field:"title" },
    { show:'持有者',field:"owner" },
    { show:'类型',field:"type" },
    { show:'注册日期',field:"registration_date" },
    { show:'注册号',field:"registration_number" }
  ]
  const [datas, setDatas] = useState([])
  const [err, setErr] = useState(null)
  const [selected, setSelected] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title')
  const [ascending, setAscending] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [datasCopy, setDatasCopy] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchData = async (fetchType) => {
    let result = null
    if (fetchType === 0) {
      result = await supabase
        .from('software_copyright')
        .select().order(sortBy, { ascending: ascending });
    }
    else if (fetchType === 1) {
      result = await supabase
        .from('software_copyright')
        .select().eq('status', 'Active')
    }
    else {
      result = await supabase
        .from('software_copyright')
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
  const handleChangeChecked = (pos, value) => {
    let flag = true
    setSelected(selected.map((item, index) => {
      if (pos === index) {
        if (!value) flag = false;
        return value
      }
      else {
        if (!item) flag = false
        return item
      }
    }))
    setSelectedAll(flag)
  }
  const handleChangeAllChecked = () => {
    setSelected(selected.map(() => { return !selectedAll }))
    setSelectedAll(!selectedAll)
  }
  const handleCilckDetail = (data) => {
    navigate(`/achievements/software-copyrights/details/${data.id}`)
  }
  const handleChangeSort = (e) => {
    setSortBy(e.target.value)
    const newDatas = datas
    newDatas.sort(sortby(e.target.value, ascending ? 1 : -1))
    setDatas(newDatas)
  }
  const handleChangeOrder = (e) => {
    setAscending(e.target.value === 'true')
    const newDatas = datas
    newDatas.sort(sortby(sortBy, e.target.value === 'true' ? 1 : -1))
    setDatas(newDatas)
  }
  const handleSearchEnter = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      setDatas(datasCopy.filter((data) => {
        if (data.title.includes(searchValue)) return data
      }))
    }
  }
  const handleExport = () => {
    let selectedData = false
    selected.forEach((item)=>{
      if(item) selectedData = true
    })
    if(!selectedData) messageAPI.info({text:'Please select at least one piece of data'})
    else{
      dispatch(exportSoftwareCopyrights(datas.filter((data,index)=>selected[index])))
    }
  }
  return (
    <Container maxWidth=''>
      <Stack gap={'32px'}>
        <Stack sx={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Stack>
            <ContentTitle>
              Software Copyrights
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
            <ContentButton startIcon={<AddIcon />} onClick={() => { navigate("/achievements/software-copyrights/new") }}>
              Add
            </ContentButton>
          </Stack>
        </Stack>
        <ContentPaper>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs" sx={{ pr: '24px', pl: '24px' }}>
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="All" />
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="CCF A" />
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="CFF B" />
            <Tab sx={{ textTransform: 'none', fontFamily: fontFamily }} label="CFF C" />
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
              <SearchTextField searchValue={searchValue} setSearchValue={setSearchValue} handleSearchEnter={handleSearchEnter} placeholder={"Search software copyrights"} />
            </Box>
            <SortByTextField onChangeSort={handleChangeSort} label={'Sort By'} defaultValue={sortBy} options={columns} />
            <OrderTextField onChangeOrder={handleChangeOrder} label={'Order'} defaultValue={ascending} />
          </Stack>
          {/* 数据表格 */}
          <Box sx={{
            '::before': {
              content: '" "',
              display: 'table'
            },
            '::after': {
              content: '" "',
              display: 'table'
            },
          }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <ContentTableHeadCell sx={{
                      padding: '0px 0px 0px 16px'
                    }}>
                      <Checkbox checked={selectedAll} onChange={handleChangeAllChecked} icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />}></Checkbox>
                    </ContentTableHeadCell>
                    <ContentTableHeadCell>
                      名称
                    </ContentTableHeadCell>
                    <ContentTableHeadCell>
                      持有者
                    </ContentTableHeadCell>
                    <ContentTableHeadCell>
                      注册号
                    </ContentTableHeadCell>
                    <ContentTableHeadCell>
                      注册时间
                    </ContentTableHeadCell>
                    <ContentTableHeadCell>
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
                              backgroundColor: selected[index + page * rowsPerPage] ? 'rgba(99, 102, 241, 0.08)' : 'rgba(17, 25, 39, 0.04)'
                            },
                            backgroundColor: selected[index + page * rowsPerPage] && 'rgba(99, 102, 241, 0.08)'
                          }}>
                            <ContentTableBodyCell padding="0 0 0 16px">
                              <Checkbox checked={selected[index + page * rowsPerPage] || false} onChange={() => handleChangeChecked(index + page * rowsPerPage, !selected[index + page * rowsPerPage])} icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />}></Checkbox>
                            </ContentTableBodyCell>
                            <ContentTableBodyCell>
                              <Stack>
                                <StyledLink underline="hover" onClick={() => handleCilckDetail(data)}>
                                  {data.title}
                                </StyledLink>
                                <Typography sx={{
                                  color: '#667085',
                                  fontWeight: 400,
                                  fontFamily: fontFamily,
                                  fontSize: '0.85rem',
                                }}>{data.type}</Typography>
                              </Stack>

                            </ContentTableBodyCell>
                            <ContentTableBodyCell>
                              <AvatarGroup max={3} sx={{ justifyContent: 'flex-end' }}>
                                {
                                  data.owner !== undefined && data.owner && data.owner.split(',').map((item, index) => {
                                    return (
                                      <Avatar key={index} {...stringAvatar(item, '40px', '16px')} />
                                    )
                                  })
                                }
                              </AvatarGroup>
                            </ContentTableBodyCell>
                            <ContentTableBodyCell>
                              <Typography sx={{
                                fontFamily: fontFamily,
                                fontWeight: 400,
                                fontSize: '0.975rem',
                              }}>
                                {data.registration_number}
                              </Typography>
                            </ContentTableBodyCell>
                            <ContentTableBodyCell>

                              <Typography sx={{
                                fontFamily: fontFamily,
                                fontWeight: 400,
                                color: '#212636',
                                fontSize: '0.975rem',
                              }}>{data.registration_date}</Typography>

                            </ContentTableBodyCell>
                            <ContentTableBodyCell>
                              <IconButton onClick={() => downloadStorageFile(data.storage_path)}>
                                <DownloadOutlinedIcon />
                              </IconButton>
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
          </Box >
        </ContentPaper>
      </Stack>
    </Container>
  )
}