import { Box } from "@mui/material";
import LogoSection from "./LogoSection";
import MenuList from "./MenuList";

function ResponsiveDrawer(props) {
  return (
    <Box width={'200px'}>
      <LogoSection></LogoSection>
      <MenuList></MenuList>
    </Box>
  )
}

export default ResponsiveDrawer;
