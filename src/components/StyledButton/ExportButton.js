import { fontFamily } from "@/utils/commonUtils";
import { Button, styled } from "@mui/material";
export const ExportButton = styled(Button)({
  padding: '7px 12px',
  fontWeight: 600,
  fontFamily: fontFamily,
  fontSize: '0.8125rem',
  borderRadius: '12px',
  color: 'inherit',
  textTransform: 'none',
})