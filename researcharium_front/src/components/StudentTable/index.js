import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Box} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from 'react';
import supabase from '../../config';
import { CheckBox } from '@mui/icons-material';

const StudentTable = ()=>{
    const columns = ["name", "gender","phone","email","department","university","student_id"]
    const [students, setStudents] = useState(null)
    const [isSelected, setIsSelected] = useState([])
    const [err, setErr] = useState(null)
    useEffect(()=>{
        const fetchData = async ()=>{
            const { data, error } = await supabase
            .from('student')
            .select();
            if(data){
                setStudents(data)
                setErr(null)
            }
            if(error){
                setErr(error)
                setStudents(null)
            }
        }
        fetchData();
    }, [])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (index)=>{
    const newIsSelected = [...isSelected]
    if(isSelected[index]){
      newIsSelected[index]=false
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id,index)=>{
    const stu = [...students]
    stu.splice(index,1)
    setStudents(stu)
    const {err} = await supabase.from('student').delete().eq('id',id)
    console.log(err)
  }

    return (
      <Paper sx={{width:'100%',display:'flex', flexWrap:'wrap', justifyContent:'center',maxHeight:500}}>
        <TableContainer sx={{width:'100%'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow role='checkbox'>
                <TableCell sx={{backgroundColor:'rgb(241, 243, 245)'}}>
                  <CheckBox color='primary'>

                  </CheckBox>
                </TableCell>
                {columns.map((column,index) => (
                    <TableCell sx={{whiteSpace:'nowrap', backgroundColor:'rgb(241, 243, 245)'}}  align='center'
                      key={index}
                    >
                      <Box width={'fix-content'}>
                        {column}
                      </Box>
                    </TableCell>
                ))}
                  <TableCell sx={{whiteSpace:'nowrap', backgroundColor:'rgb(241, 243, 245)'}} align='center'><Box>Actions</Box></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {students && students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student,index) => {
                    
                    return (
                      <TableRow display='flex' hover role='table' tabIndex={-1} key={student.id} onClick={()=>{}}>
                        <TableCell >
                          <CheckBox color='primary' checked={isSelected[index]}>
                          </CheckBox>
                        </TableCell>
                        {columns.map((column,index) => {
                          return (
                            <TableCell key={index} sx={{whiteSpace:'nowrap'}}  align='center'>
                              <Box width={'fix-content'}>{student[column]}</Box>
                            </TableCell>
                          );
                        })}
                        <TableCell sx={{whiteSpace:'nowrap'}} align='center'>
                          <IconButton size='small'>
                            <VisibilityOutlinedIcon/>
                          </IconButton>
                          <IconButton size='small'>
                            <EditOutlinedIcon/>
                          </IconButton>
                          <IconButton size='small' onClick={()=>{handleDelete(student.id,index)}}>
                            <DeleteOutlinedIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 10, 20, 50,100]}
            component="div"
            count={students ? students.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
  )
}

  export default StudentTable