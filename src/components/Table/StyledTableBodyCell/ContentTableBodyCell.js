import { fontFamily } from '@/utils/commonUtils'
import { styled, TableCell } from '@mui/material'

const ContentTableBodyCell = styled(TableCell)({
  borderBottom: '1px solid #dcdfe4',
  color: 'rgb(17, 25, 39)',
  fontFamily: fontFamily,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap'
})

export default ContentTableBodyCell