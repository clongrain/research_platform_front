import { ListItemButton, ListItemText, Typography, Chip } from "@mui/material"

// item为要渲染的菜单项， level为菜单项层级，层级越大左间距越大
const MenuItem = ({item, level})=>{
    return (
        <ListItemButton 
        sx={{
            borderRadius: `8px`,
            pl: `${level*24+24}px`,
            ml: '20px',
            backgroundColor:"rgb(28, 37, 54)"
            }}>
            <ListItemText primary = {
            <Typography color="rgb(255, 255, 255)" fontSize={"16px"} >{item.title}</Typography>} />
        
        </ListItemButton>
    )
}

export default MenuItem