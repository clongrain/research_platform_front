import { Button, Tooltip } from "@mui/material";

export default function TooltipButton({ children, title='No Permission', disabled }) {
  return (
    disabled ?
      <Tooltip title={title}>
        <span>
          {children}
        </span>
      </Tooltip>
      :
      <span>
        {children}
      </span>

  )
} 