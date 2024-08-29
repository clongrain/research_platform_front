import { fontFamily } from "@/utils/commonUtils"
import { Chip } from "@mui/material"

const UserStatusChip = ({status})=>{
  const icon = status==='Active'?
  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#15b79f" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
  : status === 'Pending' ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="#ed6c02" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"></path></svg>
  : <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="red" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>
  return (
    <Chip size="small" label={status} variant="outlined" icon={icon} sx={{
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

export default UserStatusChip