import { List, ListItemButton, Collapse, Box } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from "../MenuItem";
import { useNavigate } from "react-router-dom";
import { menuChange } from "@/action/MenuChangeAction";
const MenuGroup = ({ menu }) => {
  const {currentMenu} = useSelector(state => state.MenuChange)
  const selected = currentMenu.includes(menu.id)
  const [open, setOpen] = useState(selected)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () => {
    setOpen(!open)
  }
  const styleListButton = {
    borderRadius: '8px',
    backgroundColor: selected && '#6366F1',
    ':hover': {
      backgroundColor: selected ? '#6366F1' : 'rgba(255, 255, 255, 0.04)'
    }
  };
  const styledFont = {
    color: selected ? 'white' : '#9DA4AE',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '24px',
    fontFamily:
      'PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif'
  };
  const styledIcon = {
    width: '24px',
    height: '24px',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    color: selected ? 'white' : '#9DA4AE'
  };
  if (menu.type === 'group') {
    return (
      <Box component={'li'} sx={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '4px' }}>
        <ListItemButton onClick={handleClick}
          sx={{
            ...styleListButton
          }}>
          <Box sx={styledIcon}>
            {menu.svg}
          </Box>
          <Box sx={{ ...styledFont, flexGrow: 1 }}>{menu.title}</Box>
          {open ? <ExpandMoreIcon sx={{ color: selected ? 'white' : '#4D5761', ml: '16px', fontSize: '16px' }} />
            : <ChevronRightIcon sx={{ color: selected ? 'white' : '#4D5761', ml: '16px', fontSize: '16px' }} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding >
            {
              menu.children?.map(item => {
                return <MenuItem key={item.id} item={item} />
              })
            }
          </List>
        </Collapse>
      </Box>
    )
  }
  else if(menu.type ==='empty-group'){
    return (
      <Box component={'li'} sx={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '4px' }}>
        <ListItemButton onClick={()=>{navigate(`/${menu.id}`);dispatch(menuChange(`/${menu.id}`))}}
          sx={{
            ...styleListButton
          }}>
          <Box sx={styledIcon}>
            {menu.svg}
          </Box>
          <Box sx={{ ...styledFont, flexGrow: 1 }}>{menu.title}</Box>
        </ListItemButton>
      </Box>
    )
  }

}

export default MenuGroup