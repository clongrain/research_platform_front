
import { Box, Drawer, Paper, useMediaQuery } from '@mui/material';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import { MessageContainer } from '@/components/Message';
import { useDispatch } from 'react-redux';
import storgeUtils from '@/utils/storageUtils';
import { USER_TYPE } from '@/config';
import UserSelectModal from './UserSelectModal'; 
import { menuChange } from '@/action/MenuChangeAction';

const Layout = () => {
  const computer = useMediaQuery('(min-width:1200px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(storgeUtils.getUser() !== null && storgeUtils.getUser() !== undefined && storgeUtils.getUser().user_type === USER_TYPE.NOT_SET)
  const dispatch = useDispatch()
  const handleMenuOpenChange = () => {
    setMenuOpen(!menuOpen)
  }
  useEffect(() => {
    window.onpopstate = () => {
      dispatch(menuChange(window.location.pathname))
    }
    return () => {
      window.onpopstate = null
    }
  }, [])
  return (
    <>
      <Box sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <Header handleMenuOpenChange={handleMenuOpenChange} />
        {/* MENU SECTION */}
        <Drawer anchor='left' variant={computer ? 'persistent' : 'temporary'} open={(computer || menuOpen)} onClose={() => { setMenuOpen(false) }}>
          <Paper sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            height: '100%',
            zIndex: 100000
          }}>
            <SideBar />
          </Paper>
        </Drawer>
        <Box sx={{
          paddingLeft: computer ? '280px' : 0,
          maxWidth: '100%',
          flexGrow: 1
        }}>
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box component={'main'} sx={{
              flexGrow: 1,
              pt: '24px',
              pb: '24px'
            }}>
              {modalOpen ? <UserSelectModal open={modalOpen} setOpen={setModalOpen} />
                : <Outlet />}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '400px',
        zIndex: 6666
      }}>
        <MessageContainer timeout={3000} maxCount={5} />
      </Box>
      {/* <UserSelectModal open={modalOpen} setOpen={setModalOpen}/> */}
    </>
  )
}

export default Layout
