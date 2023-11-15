import { ListItemButton, Box} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// item为要渲染的菜单项， level为菜单项层级，层级越大左间距越大
const MenuItem = ({item})=>{
    const [selected, setSelected] = useState(false)
    const navigate = useNavigate()
    const handleClick = ()=>{
        setSelected(true)
        navigate(`/${item.id}`)
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

    return (
      <ListItemButton onClick={handleClick}
        sx={styleListButton}
      >
        <Box
          sx={{...styledFont, color: selected ? '#55bc8a' : '#242e42'}}
        >
          {item.title}
        </Box>   
      </ListItemButton>
    )
}

export default MenuItem