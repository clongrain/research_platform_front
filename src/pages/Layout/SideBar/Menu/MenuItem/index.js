import { ListItemButton, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { menuChange } from "@/action/MenuChangeAction"
// item为要渲染的菜单项， level为菜单项层级，层级越大左间距越大

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const menuSelected = useSelector(state=>state.MenuChange.currentMenu)
  const selected = menuSelected.includes(item.id)
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(menuChange(item.id))
    navigate(`/${item.id}`)
  }
  const styleListButton = {
    mt: '4px',
    borderRadius: '8px',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)'
    }
  };
  const styledFont = {
    color: '#9DA4AE',
    fontSize: '13px',
    lineHeight: '24px',
    fontWeight: 500,
    fontFamily:
      'PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif'
  };

  const styledIcon = {
    width: '24px',
    height: '24px',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    color: '#9DA4AE',
    justifyContent: 'center'
  };

  return (
    <ListItemButton onClick={handleClick}
      sx={styleListButton}
    >
      <Box sx={styledIcon}>
        {selected ? <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', opacity: '1', backgroundColor: '#6366F1' }}></Box>
          : <></>}
      </Box>
      <Box
        sx={{ ...styledFont, color: selected ? '#fff' : '#9DA4AE' }}
      >
        {item.title}
      </Box>
    </ListItemButton>
  )
}

export default MenuItem