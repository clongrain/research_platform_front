import StyledTextField from "../StyledTextField";

export default function OrderTextField({onChangeOrder, label, defaultValue, options}){
  return (
    <StyledTextField onChange={onChangeOrder} variant="filled" sx={{
      margin: '0',
      '@media (min-width:900px)': {
        minWidth: '120px',
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
        <>
          <option key={"ascending"} value={true}>
            升序
          </option>
          <option key={"descending"} value={false}>
            降序
          </option>
        </>
      }
    </StyledTextField>
  )
}