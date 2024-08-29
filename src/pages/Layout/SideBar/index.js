import { Box } from "@mui/material";
import Menu from "./Menu";
import LogoSection from "./LogoSection";

export default function SideBar() {
  
  return (
    <Box
      sx={{
        width: '280px',
        backgroundColor:'#1C2536',
        height:'100%'
      }}
    >
      <LogoSection/>
      <Menu/>
    </Box>
  )
}

