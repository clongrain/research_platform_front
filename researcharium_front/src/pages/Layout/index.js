import Header from './Header';
import { Box} from '@mui/material';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = ()=>{
    return (
        <Box display={'flex'} flexWrap={'wrap'}>
            {/* header */}
            <Box width={"100%"}>
                <Header></Header>
            </Box>

            {/* body */}
            <Box display={'flex'} width={'100%'}>
                {/* navigation */}
                <Box minWidth={'220px'} overflow={'auto'}>
                    <SideBar/>
                </Box>

                {/* content */}
                <Box flexGrow={1} padding={'10px'} overflow={'hidden'}>
                    <Outlet/>
                {/* <GlobalPagination/> */}
                </Box>
            </Box>

            {/* footer */}
            <Box>
                {/* <Footer></Footer> */}
            </Box>
    </Box>
    )
}

export default Layout
