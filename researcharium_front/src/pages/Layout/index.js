import Header from './Header';
import { Box, Divider, Stack} from '@mui/material';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = ()=>{
  return (
    <>
      {/* header */}
      <Header/>
     
      <Divider
        sx={{
          height: '1.5px',
          borderStyle: 'solid',
          borderSidth: '1px 0 0',
          borderImageSource:
            'radial-gradient(circle at 50% 3%,rgba(193,201,209,.53),hsla(0,0%,100%,.2))',
          borderImageSlice: 1
        }}
      />

      {/* body */}
      <Stack direction='row' spacing={0} justifyContent='space-between'>
        {/* navigation */}
        <SideBar/>
        {/* content */}
        <Box sx={{ backgroundColor: '#eff4f9', width: 'calc(100% - 230px)' }}>
          <Box sx={{ display: 'block' }}>
            <Box sx={{ padding: '20px' }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Stack>

      {/* footer */}
      <Box></Box>
    </>
  )
}

export default Layout
