import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const StyledDatePicker = styled(DatePicker)({
  'legend': {
    width: '0'
  },
  '& .MuiInputBase-root': {
    mt: '8px'
  },
  'label': {
    transform: 'none',
    position: 'relative',
    color: '#212636',
    '&:has(~ .MuiOutlinedInput-root.Mui-focused)': {
      color: '#635BFF',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '8px',
      border: '1px solid #dcdfe4',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)'
    },
    '&:hover fieldset': {
      border: '1px solid #dcdfe4'
    },
    '&.Mui-focused fieldset': {
      boxShadow: '0 0 0 2px #635bff',
      border: 'none'
    }
  },
  '& .MuiInputBase-input': {
    border: '1px solid',
    borderColor: 'transparent',
    fontSize: 16,
    width: '100%',
    padding: '8px 12px',
  }
})
export default StyledDatePicker