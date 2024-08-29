import { Box } from "@mui/material";
import Menu from "./Menu";
import LogoSection from "./LogoSection";

export default function SideBar() {
  
  return (
    <Box
      sx={{
        paddingLeft: '20px',
        width: '230px',
        backgroundColor: '#eff4f9',
      }}
    >
      <Box sx={{maxWidth:'220px'}}>
        <LogoSection/>
        <Menu/>
      </Box>
    </Box>
  )
}

