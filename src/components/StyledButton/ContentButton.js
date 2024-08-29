import { fontFamily } from "@/utils/commonUtils";
import { Button, styled } from "@mui/material";
export const ContentButton = styled(Button)({
  minWidth:'108px',
  fontFamily:fontFamily,
  color: 'rgb(255, 255, 255)',
  backgroundColor: '#4e36f5',
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 5px',
  textTransform: 'none',
  borderRadius: '10px',
  padding: '8px 20px',
  backgroundImage: 'linear-gradient(180deg,#635bff 0%, #4e36f5 100%)'
})