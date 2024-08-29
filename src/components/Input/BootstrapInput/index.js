import { InputBase, alpha, styled, FormControl, InputLabel, Select } from "@mui/material";
export const BootstrapInputBase = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: '28px',
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#dcdfe4',
    fontSize: 16,
    width: '100%',
    padding:'8px 12px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
    '&:focus': {
      // boxShadow: `${alpha('#635bff', 0.25)} 0 0 0 0.2rem`,
      boxShadow:'0 0 0 2px #635bff'
    },
  },
}));
export const BootstrapSelectInputBase = styled(InputBase)(({ theme }) => ({
  'input':{
    opacity:0,
    bottom:'0px',
    left:'0px',
    position:'absolute',
    width:'100%',
    pointerEvents:'none'
  },
  '&::before': {
    borderRadius:'inherit',
    inset:'0px',
    content: '" "',
    position: 'absolute',
    pointerEvents: 'none'
  },
  'label + &': {
    marginTop: '8px',
  },
  width:'100%',
  minHeight:'40px',
  borderRadius: '8px',
  paddingInline:'12px',
  paddingBlock:'0px',
  border:'1px solid #dcdfe4',
  boxShadow:'0px 1px 2px rgba(0, 0, 0, 0.08)',
  cursor:'pointer',
  '&:focus': {
    // boxShadow: `${alpha('#635bff', 0.25)} 0 0 0 0.2rem`,
    boxShadow:'0 0 0 2px #635bff'
  }
}));
export const BootstrapSelect = styled(Select)(({ theme }) => ({
  
  '&:has( .MuiSelect-select:focus)':{
    boxShadow:'0 0 0 2px #635bff'
  },
  'label + &': {
    marginTop: '8px',
  },
  '&::before':{
    all:'unset'
  },
  '&::after':{
    all:'unset'
  },
  '& .MuiSelect-select:focus':{
    backgroundColor:'unset'
  },
  width:'100%',
  minHeight:'40px',
  borderRadius: '8px',
  paddingInline:'12px',
  paddingBlock:'0px',
  border:'1px solid #dcdfe4',
  boxShadow:'0px 1px 2px rgba(0, 0, 0, 0.08)',
  cursor:'pointer',
}));
const BootstrapInput = ({label}) => {
  const id = label + Date.now()
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor={id} shrink>{label}</InputLabel>
      <BootstrapInputBase id={id}/>
    </FormControl>
  )
}
export default BootstrapInput