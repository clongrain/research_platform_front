import StyledTextField from "../StyledTextField"

export default function SortByTextField({onChangeSort, label, defaultValue, options}){
  return (
    <StyledTextField variant="filled" onChange={onChangeSort} sx={{
      margin: '0',
      '@media (min-width:900px)': {
        minWidth: '150px',
        width: 'auto'
      },
      '@media (min-width:0px)': {
        width: '100%'
      }
    }} select label={label} defaultValue={defaultValue}
      InputProps={{
        disableUnderline: true
      }}
      SelectProps={{
        native: true
      }}
    >
      {
        options.map((option) => {
          return (
            <option key={option.field} value={option.field}>
              {option.show}
            </option>
          )
        })
      }
    </StyledTextField>
  )
}