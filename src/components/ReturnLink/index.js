import { Link, styled } from "@mui/material";
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from "react-router-dom";
import { fontFamily } from "@/utils/commonUtils";
export const StyledLink = styled(Link)({
  fontFamily: fontFamily,
  fontWeight: 500,
  color: '#212636',
  userSelect: 'none',
  lineHeight: 1.57,
  cursor: 'pointer',
  width: 'fit-content',
  fontSize: '1rem'
})
export default function ReturnLink({ to, title }) {
  const navigate = useNavigate()
  return (
    <StyledLink underline="hover" sx={{
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      gap: '8px'
    }} onClick={() => navigate(to)}>
      <WestIcon sx={{ width: '20px', height: '20px' }} />
      {title}
    </StyledLink>
  )
}