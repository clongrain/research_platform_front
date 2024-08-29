import { InputAdornment, SvgIcon } from "@mui/material"
import StyledTextField from "../StyledTextField"

export default function SearchTextField({ searchValue = '', setSearchValue = (newValue) => searchValue = newValue, handleSearchEnter = () => { }, placeholder }) {
  return (
    <StyledTextField value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} onKeyUp={handleSearchEnter} fullWidth placeholder={placeholder} InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#fff" fillOpacity="0.01" d="M11 19c4.4183 0 8-3.5817 8-8s-3.5817-8-8-8-8 3.5817-8 8 3.5817 8 8 8Z" />
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M19 11c0 4.4183-3.5817 8-8 8s-8-3.5817-8-8 3.5817-8 8-8 8 3.5817 8 8Z" />
            </svg>
          </SvgIcon>
        </InputAdornment>
      )
    }} />
  )
}