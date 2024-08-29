import { styled, TableCell } from '@mui/material'
import { fontFamily } from '@/utils/commonUtils'

const BlockTableHeadCell = styled(TableCell)({
  fontFamily: fontFamily,
  fontSize:'0.875rem',
  padding:'16px',
  backgroundColor:'#f9fafb',
  borderBottom:'1px solid #dcdfe4',
  whiteSpace:'nowrap',
  color:'#667085',
  lineHeight:1
})

export default BlockTableHeadCell