import { AppBar,Toolbar, Typography, Box, Button, Menu, MenuItem, Stack } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import Fade from "@mui/material/Fade";


const Header = ()=>{
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const handleMenuClick = (e)=>{
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose = ()=>{
        setAnchorEl(null)
    }
    return (
        <AppBar style={{opacity:'0.9',position:'sticky',height:'56px',justifyContent:'center'}}>    
            <Toolbar height='100%' style={{minHeight:'0'}}>
                {/* logo section */}
                <Box>
                    <Typography variant="h1">科研信息</Typography>
                    <Typography variant="body2">Research Online</Typography>
                </Box>
                {/* header function section */}
                <Stack 
                    sx={{
                        flex: '1'
                    }}
                    direction={'row'}
                    justifyContent={'end'}
                >
                    <Button 
                        id="user-menu-button"
                        // style={{padding:'0'}}
                        variant="contained"
                        disableElevation
                        aria-controls={openMenu ? 'user-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleMenuClick}
                        startIcon={<AccountCircleOutlinedIcon style={{fontSize:'30px'}}/>} 
                        endIcon={<KeyboardArrowDownIcon/>}
                    >
                    </Button>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        MenuListProps={{
                            'aria-labelledby': 'user-menu-button'
                        }}
                        onClose={handleMenuClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>         
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header