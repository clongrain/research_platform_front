import { fontFamily } from "@/utils/commonUtils"
import { styled, TextField } from "@mui/material"
const StyledEditTextField = styled(TextField)({
  'input,select': {
    lineHeight: '24px',
    fontSize: '14px',
  },
  '& ::placeholder': {
    color: 'black',
    fontWeight: 700,
    fontSize: '14px',
    fontFamily: '"Plus Jakarta Sans",sans-serif'
  },
  '.MuiInputLabel-root': {
    color: 'rgb(92 98 108)',
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: '16px'
  },
  'label:has(~ .Mui-focused)': {
    color: '#8C57FF',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E3E7',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    ':hover': {
      backgroundColor: 'rgba(17, 25, 39, 0.04)'
    },
    '&:hover fieldset': {
      borderColor: '#E0E3E7',
    },
    '&.Mui-focused fieldset': {
      backgroundColor: 'transparent',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: '3px'
    }
  },
  '& .MuiFilledInput-root': {
    borderRadius: '8px',
    borderColor: 'rgb(229, 231, 235)',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(17, 25, 39, 0.04)',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: 'rgb(99, 102, 241)',
      boxShadow: 'rgb(99, 102, 241) 0px 0px 0px 2px'
    }
  }
})
export default StyledEditTextField