import { ListItemButton, ListItemText, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom"

// item为要渲染的菜单项， level为菜单项层级，层级越大左间距越大
const MenuItem = ({item, level})=>{
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/${item.id}`)
    }
    return (
        <ListItemButton onClick={handleClick} sx={{pl:'80px'}}>
            <ListItemText primary = {
            <Typography fontSize={"12px"} >{item.title}</Typography>} />
        </ListItemButton>
    )
}

export default MenuItem