import { styled, TableCell } from '@mui/material'
import { fontFamily } from '@/utils/commonUtils'

const ContentTableHeadCell = styled(TableCell)({
  fontFamily: fontFamily,
  fontSize:'1rem',
  borderBottom: 'none',
  textTransform: 'uppercase',
  backgroundColor:'#f9fafb',
  borderBottom:'1px solid #dcdfe4',
  borderTop:'1px solid #dcdfe4',
  whiteSpace:'nowrap',
  color:'#667085'
})

export default ContentTableHeadCell