import { Stack, Box, Typography } from "@mui/material"
import {ReactComponent as ClusterManagement} from "@/assets/ClusterManagement.svg";
export default function LogoSection(){
    return (
        <Stack sx={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          padding:'24px',
          width:'100%'
        }}>
          <Box sx={{
            borderColor:'#2F3746',
            borderRadius:'8px',
            borderStyle:'solid',
            borderWidth:'1px',
            height:'42px',
            width:'42px',
            padding:'4px',
            display:'flex'
          }}>
            <svg fill="none" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.16" d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z" fill="#6366F1"></path><path d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z" fill="#6366F1"/>
            </svg>
          </Box>
          <Stack sx={{
            margin:'0 0 0 16px',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            flexGrow:1,
            height:'40px'
          }}>
            <Box sx={{
              flexGrow:1,
              height:'100%',
              width:'auto'
            }}>
              <Typography component={'h6'} sx={{
                
                fontWeight:700,
                fontSize:'16px',
                color:'#fff',
                lineHeight:'1.2',
                fontFamily:'Komoda'
              }}>
                企业与服务智能计算
              </Typography>
              <Typography component={'p'} sx={{
                fontSize:'14px',
                lineHeight:1.57,
                color:'rgb(157, 164, 174)'
              }}>
                科研管理平台
              </Typography>
            </Box>
          </Stack>
        </Stack>
    )
}