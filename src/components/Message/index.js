import { useEffect, useState } from "react"
import { Alert, AlertTitle, Stack } from "@mui/material"
class Notice{

}
let add = ()=>{}; 
const getUUid = ()=>{
  return "Message_"+Date.now();
}
export const MessageContainer = (props)=>{
  const [notices, setNotices] = useState([])
  const {timeout, maxCount} = props
  useEffect(()=>{
    if(notices.length>=maxCount){
      const [firstNotice] = notices
      remove(firstNotice)
    }
  },[notices])
  add = (notice)=>{
    setTimeout(()=>{remove(notice)},timeout)
    setNotices((preNotices)=>[...preNotices, notice]);
    
  }
  const remove = (notice)=>{
    setNotices((preNotices)=>preNotices.filter(item=>item?.key!==notice?.key))
  }
  return (
    <Stack sx={{width:'100%'}} spacing={2}>
      {notices.map((notice)=>{
        
        return (
          <Alert severity={notice?.type} key={notice?.key}>
            {notice?.title&&<AlertTitle>{notice?.title}</AlertTitle>}
            {notice?.text}
          </Alert>
        )
      })}
    </Stack>
  )
}
export const messageAPI = {
  info:({title,text})=>{
    add({title:title,text:text,type:'info',key:getUUid()})
  },
  success:({title,text})=>{
    add({title:title,text:text,type:'success',key:getUUid()})
  },
  error:({title,text})=>{
    add({title:title,text:text,type:'error',key:getUUid()})
  },
  warning:({title,text})=>{
    add({title:title,text:text,type:'warning',key:getUUid()})
  }
}
