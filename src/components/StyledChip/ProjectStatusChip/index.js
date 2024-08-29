import { fontFamily } from "@/utils/commonUtils"
import { Chip } from "@mui/material"
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import MovingIcon from '@mui/icons-material/Moving';
const ProjectStatusChip = ({status})=>{
  return (
    <Chip size="small" label={status} variant="outlined" 
    icon={status==='Completed'
      ?<TaskAltOutlinedIcon sx={{fill:'green'}}/>
      :(status==='Progressing'?<MovingIcon sx={{fill:'red'}}/>:<></>)} sx={{
      backgroundColor:'#fff',
      fontSize:'0.825rem',
      borderColor:'#dde7ee',
      fontFamily:fontFamily,
      fontWeight:500,
      color:'#121517',
      lineHeight:1.2,
      borderRadius:'12px',
      letterSpacing:'0.6px'
    }}/>
  )
}

export default ProjectStatusChip