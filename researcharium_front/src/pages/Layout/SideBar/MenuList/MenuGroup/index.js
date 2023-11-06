import {List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from "../MenuItem";
import MenuCollapse from "../MenuCollapse";
import { useState } from "react";
const MenuGroup = ({menuGroup})=>{
    
    const [open, setOpen] = useState(false)

    const handleClick = ()=>{
        setOpen(!open)
    }
    const menuItems =  menuGroup.children?.map((item)=>{
        switch(item.type){
            case 'collapse':
                return <MenuCollapse key={item.id} collapse={item} level={1}></MenuCollapse>;
            case 'item': 
                return <MenuItem key={item.id} item={item} level={1}></MenuItem>;
            default:
                return<></>;
        }
    })

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon >
                    {menuGroup.icon}
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{fontSize:"12px"}} primary={menuGroup.title} />
                {menuGroup.children ? open ? <ExpandLess/> : <ExpandMore/> : <></>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    {menuItems}
                </List>
            </Collapse>
        </>
    )
}

export default MenuGroup