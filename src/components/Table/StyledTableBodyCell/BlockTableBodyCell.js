import { fontFamily } from '@/utils/commonUtils'
import { styled, TableCell } from '@mui/material'

const BlockTableBodyCell = styled(TableCell)({
  borderBottom: '1px solid #dcdfe4',
  color: 'rgb(17, 25, 39)',
  fontFamily: fontFamily,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  lineHeight: 1.57,
  padding: '12px 16px',
  fontWeight: 400
})

export default BlockTableBodyCell