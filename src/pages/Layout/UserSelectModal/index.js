import StyledAutocomplete from "@/components/Input/StyledAutocomplete";
import StyledEditTextField from "@/components/Input/StyledEditTextField";
import { messageAPI } from "@/components/Message";
import supabase, { USER_TYPE } from "@/config";
import { fontFamily, isChinese } from "@/utils/commonUtils";
import storgeUtils from "@/utils/storageUtils";
import { Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function UserSelectModal({ open, setOpen }) {
  const options = [
    {
      type: USER_TYPE.STUDNET,
      name: "学生"
    },
    {
      type: USER_TYPE.TEACHER,
      name: "导师"
    }
  ]
  const [userTypeValue, setUserTypeValue] = useState(options.at(1))
  const [userName, setUserName] = useState("")
  const handleConfirmUserType = async () => {
    if (!userTypeValue) {
      messageAPI.warning({ text: '请选择你的身份！' })
      return
    }
    else if (userName.trim() === '') {
      messageAPI.warning({ text: '请输入你的姓名' })
      return
    }
    else if (!isChinese(userName)) {
      messageAPI.warning({ text: '姓名格式错误' })
      return
    }
    const user = storgeUtils.getUser()
    const { data, error } = await supabase.from('user').update({ user_type: userTypeValue.type }).eq('user_id', user.user_id).select()
    if (error) {
      messageAPI.error({ text: '保存用户类型失败' })
    }
    else if (data && data.length > 0) {
      storgeUtils.saveUser(data.at(0))
      messageAPI.success({ text: '保存用户类型成功' })
      if (userTypeValue.type === USER_TYPE.STUDNET) {
        await supabase.from('user_student').insert({ user_id: user.user_id, email: user.email, status: 'Active', name: userName })
      }
      else if (userTypeValue.type === USER_TYPE.TEACHER) {
        await supabase.from('user_teacher').insert({ user_id: user.user_id, email: user.email, status: 'Active', name: userName })
      }
      setOpen(false)
    }
  }
  return (
    <Modal open={open} sx={{
      '& .MuiModal-backdrop': {
        background: 'rgb(255 255 255 / 5%)',
        backdropFilter: 'blur(3px)'
      }
    }}>
      <Paper elevation={4} sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate: '-50% -50%',
        minWidth: '320px',
        minHeight: '180px',
        padding: '16px',
        outline: 0
      }}>
        <Stack sx={{
          flexDirection: 'column',
          gap: '20px'
        }}>
          <Typography sx={{
            fontFamily: fontFamily,
            fontSize: '1.125rem',
            fontWeight: 700,
            userSelect: 'none'
          }}>初次登录，请输入您的用户类型及姓名：</Typography>
          <Stack gap={'32px'}>
            <StyledAutocomplete size="small" disableCloseOnSelect options={options} getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Stack {...props}>
                  <Typography sx={{ userSelect: 'none' }}>{option.name}</Typography>
                </Stack>
              )}
              renderInput={(params) => (
                <TextField {...params} inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
              )}
              isOptionEqualToValue={(option, value) => option.type === value.type}
              value={userTypeValue} onChange={(e, newValue) => setUserTypeValue(newValue)}
            />
            <StyledEditTextField label="姓名" size="small" value={userName || ''} onChange={(e) => setUserName(e.target.value)} />
          </Stack>
        </Stack>
        <Button fullWidth sx={{
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(33, 43, 54)',
          mt: '64px',
          boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 5px',
          textTransform: 'none',
          borderRadius: '10px',
          padding: '8px 16px',
          '&.Mui-disabled': {
            color: 'rgb(255, 255, 255)',
            backgroundColor: '#dadce1'
          },
          ':hover': {
            backgroundColor: 'rgb(100 103 106)'
          }
        }} onClick={handleConfirmUserType}>
          确认
        </Button>
      </Paper>

    </Modal>
  )
}