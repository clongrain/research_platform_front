import { Autocomplete, styled } from "@mui/material"


const StyledAutocomplete = styled(Autocomplete)({
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
  }
})
export default StyledAutocomplete