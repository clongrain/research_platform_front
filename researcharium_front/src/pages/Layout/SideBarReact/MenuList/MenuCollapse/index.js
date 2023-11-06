import { Collapse, ListItemButton, ListItemText, Typography, List } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from "../MenuItem"
import { useState } from "react";
// item为要渲染的菜单项， level为菜单项层级，层级越大左间距越大
const MenuCollapse = ({collapse, level})=>{

    const [open, setOpen] = useState(false)

    const handleClick = ()=>{
        setOpen(!open)
    }

    const items = collapse.children.map((item)=>{
        switch(item.type){
            case 'collapse':
                return <MenuCollapse key={item.id} collapse={item} level={level+1}></MenuCollapse>;
            case 'item':
                return <MenuItem key={item.id} item={item} level={level+1}></MenuItem>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                )
        }
    })
    return (
        <>
        <ListItemButton onClick={handleClick}
        sx={{
            borderRadius: `8px`,
            alignItems:`center`,
            pl: `${level*24+24}px`,
            ml: '20px',
            backgroundColor:"rgb(28, 37, 54)"
            }}>
            <ListItemText primary = {<Typography sx={{fontSize:"16px",color:"rgb(255, 255, 255)"}}>{collapse.title}</Typography>} />
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {items}
            </List>
        </Collapse>
        
        </>
        
    )
}

export default MenuCollapse