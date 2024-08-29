import { Box, Button, Stack, Typography } from "@mui/material";
import './index.css'
import { fontFamily } from "@/utils/commonUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
export default function NotFoundPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Stack margin={'20px auto'} sx={{
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box className="back">
        <Stack sx={{
          position: 'absolute',
          bottom: '100px',
          right: '300px',
          translate: '50% 50%',
          gap: '24px',
          width: '100%',
          alignItems:'center'
        }}>
          <Typography sx={{
            fontFamily: fontFamily,
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#7165ef',
            width:'fit-content'
          }}>
            Sorry, the page you visited does not exist
          </Typography>
          <Button sx={{
            color: 'rgb(255, 255, 255)',
            backgroundColor: '#4e36f5',
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 5px',
            textTransform: 'none',
            borderRadius: '10px',
            padding: '8px 20px',
            backgroundImage: 'linear-gradient(180deg,#635bff 0%, #4e36f5 100%)'
          }} onClick={()=>{
            navigate('/users/students')
            dispatch(menuChange('/users/students'))
          }}>
            Back Home
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}