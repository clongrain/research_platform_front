import {List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import MenuItem from "../MenuItem";
const MenuGroup = ({menu})=>{
    
    const [open, setOpen] = useState(false)
    const handleClick = ()=>{
        setOpen(!open)
    }
    const styleListButton = {
        justifyContent: 'initial',
        paddingLeft: '42px',
        ':hover': {
          backgroundColor: '#eff4f9',
        },
    };
    const styledFont = {
        color: '#242e42',
        fontSize: '12px',
        lineHeight: '24px',
        fontFamily:
          'PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
        width: '180px',
        ':hover': {
          color: '#55bc8a',
        },
    };
    const styledIcon = {
        width: '20px',
        height: '20px',
        paddingRight: '12px',
        display: 'flex',
        alignItems: 'center',
      };  
    
    return (
      <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
        <ListItemButton  onClick={handleClick} 
          sx={{
            ...styleListButton,
            paddingLeft: '12px',
          }}>
          <Box sx={styledIcon}>
            {menu.svg}
          </Box>
          <Box sx={{ ...styledFont, color: open ? '#55bc8a' : '#242e42' }}>{menu.title}</Box>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding >
            {
              menu.children?.map(item=>{
                return <MenuItem key={item.id} item={item}/>
              })
            }
          </List>
        </Collapse>
      </List>
    )
}

export default MenuGroup