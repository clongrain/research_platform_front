import { Box, Stack, useMediaQuery, IconButton, Badge, Popper, Typography, Avatar, Paper, Menu, Tooltip, Divider, List, ListItemButton, Button, Popover } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import 'animate.css'
import './index.css'
import { stringAvatar } from "@/utils/commonUtils";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import supabase, { USER_TYPE } from "@/config";
import storgeUtils from "@/utils/storageUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
export default function Header(props) {
  const { handleMenuOpenChange } = props
  const computer = useMediaQuery('(min-width:1200px)')
  const [userName, setUserName] = useState("")
  const [notifications, SetNotifications] = useState([])
  const [anchorEl3, setAnchorEl3] = useState(null)
  const display3 = Boolean(anchorEl3)
  const id3 = display3 ? "profile" : undefined
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: 'rgb(240, 68, 56)'
    },
  }));
  const handleSignOut = () => {
    const { error } = supabase.auth.signOut()
    storgeUtils.removeUser()
    storgeUtils.removeSession()
    navigate('/login')
  }
  const handleClickProfile = () => {
    const userType = storgeUtils.getUser().user_type
    let urlField = ""
    if (userType === USER_TYPE.STUDNET) {
      urlField = "students"
    }
    else if (userType === USER_TYPE.TEACHER) {
      urlField = 'teachers'
    }
    dispatch(menuChange('/users/' + urlField + '/details'))
    navigate('/users/' + urlField + '/details/' + storgeUtils.getUser().user_id)
  }
  useEffect(()=>{
    if(storgeUtils.getUser().user_type===USER_TYPE.ADMIN) setUserName("管理")
    else setUserName(storgeUtils.getUser().name)
  })
  return (
    <Box component={'header'}
      sx={{
        zIndex: 100,
        position: 'sticky',
        backdropFilter: 'blur(6px)',
        top: '0px',
        background: 'rgba(255, 255, 255, 0.8)',
        '@media (min-width:1200px)': {
          left: '280px',
          width: 'calc(100% - 280px)',
        }
      }}
    >
      <Stack sx={{
        pl: '16px',
        pr: '24px',
        minHeight: '64px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <Stack>
          {!computer &&
            <IconButton onClick={handleMenuOpenChange} sx={{ color: 'rgb(67, 56, 202)' }}>
              <MenuIcon />
            </IconButton>
          }
        </Stack>
        <Stack sx={{
          flexDirection: 'row',
          margin: '0px 0px 0px 16px',
          alignItems: 'center',
          position: 'relative',
          gap: '16px'
        }}>
          <Tooltip title="Notifications">
            <IconButton sx={{ color: '#8B0000', ':hover': { transform: 'scale(1.05) translateZ(0px)' } }}>
              <StyledBadge badgeContent={notifications.length} max={99} >
                <NotificationsNoneOutlinedIcon sx={{ fontSize: '24px' }} />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Concacts">
            <IconButton sx={{ color: '#FFDAB9', ':hover': { transform: 'scale(1.05) translateZ(0px)' } }}>
              <ContactsIcon sx={{ fontSize: '24px' }} />
            </IconButton>
          </Tooltip>
          <Box aria-describedby={id3} component={'button'} sx={
            {
              ml: '6px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0'
            }} onClick={(event) => { setAnchorEl3(anchorEl3 ? null : event.currentTarget) }}>
            <Avatar {...stringAvatar(userName, '40px', '16px')} />
          </Box>
          <Popover sx={{ zIndex: 1000 }} id={id3} anchorEl={anchorEl3} open={display3} onClose={() => { setAnchorEl3(null) }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >

            <Box sx={{ padding: '16px' }}>
              <Typography sx={{
                fontWeight: 600,
                lineHeight: 1.57143,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {userName}
              </Typography>
              <Typography sx={{
                fontSize: '0.875rem',
                color: 'rgb(99, 115, 129)'
              }}>
                {storgeUtils.getUser().email}
              </Typography>
            </Box>
            <Divider />
            <List sx={{ padding: '8px' }}>
              <ListItemButton sx={{ borderRadius: '8px', padding: '4px 8px' }}>
                <HomeOutlinedIcon sx={{ mr: '12px' }} />
                Home
              </ListItemButton>
              <ListItemButton sx={{ borderRadius: '8px', padding: '4px 8px' }}
                onClick={handleClickProfile}
              >
                <AccountCircleOutlinedIcon sx={{ mr: '12px' }} />
                Profile
              </ListItemButton>
            </List>
            <Divider />
            <Box padding={"8px"}>
              <Button fullWidth sx={{
                borderRadius: '8px',
                color: 'red'
              }} onClick={handleSignOut}>
                Sign out
              </Button>
            </Box>
            {/* </Paper> */}
          </Popover>
        </Stack>
      </Stack>
    </Box >
  )
}
