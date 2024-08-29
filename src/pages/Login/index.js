import { MessageContainer } from "@/components/Message";
import BasicLogin from "./BasicLogin";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import storgeUtils from "@/utils/storageUtils";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
export default function Login(){
  const session = storgeUtils.getSession()
  const isLogined = session && session.expires_at>(Date.now()/1000)
  const dispatch = useDispatch()
  if(isLogined){
    dispatch(menuChange("/users/students"))
    return <Navigate to={"/users/students"}/>
  }
  return (
    <>
      <BasicLogin/>
      <Box sx={{
        position:'fixed',
        top:'10px',
        right:'10px',
        width:'400px',
      }}>
        <MessageContainer timeout={3000} maxCount={5}/>
      </Box>
      
    </>
  )
}