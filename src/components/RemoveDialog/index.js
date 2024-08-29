import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function RemoveDialog({ text, open, setOpen = () => { }, invokeMethod = () => { } }) {
  return (
    <Dialog
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setOpen(false) }}>取消</Button>
        <Button onClick={() => { setOpen(false); invokeMethod() }}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
}