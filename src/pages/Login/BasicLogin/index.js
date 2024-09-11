import { Box, TextField, Typography, Button, Checkbox, Paper, InputAdornment, FormControlLabel, Link, styled, useMediaQuery } from "@mui/material"
import { useState } from "react";
import supabase, { USER_TYPE } from "@/config";
import { CheckCircle, EmailOutlined, LockOutlined, RadioButtonUnchecked } from "@mui/icons-material";
import storgeUtils from "@/utils/storageUtils";
import { useNavigate } from "react-router-dom";
import { messageAPI } from "@/components/Message";
import { useDispatch } from "react-redux";
import { menuChange } from "@/action/MenuChangeAction";
export default function BasicLogin() {
  const [rememberMe, setRememberMe] = useState(false)
  const dispathch = useDispatch()
  const LoginButton = styled(Button)({
    borderRadius: '5px',
    background: 'linear-gradient(to right bottom, #0062ca, #9262e7)',
    color: 'var(--shades-white, #FFF)',
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    lineHeight: '18px',
    width: '160px',
    height: '40px',
    padding: '8px 12px',
    gap: '6px',
    '&:hover': {
      background: 'var(--primary-300, #6D98EE)',
    },
    '&:active': {
      background: 'var(--primary-600, #7F55C4)',
    },
    '&:disabled': {
      background: 'var(--gray-200, #DFE4E8)',
    },
  });
  const [canClick, setCanClick] = useState(true)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async (type) => {
    const { data, error } =
      type === "LOGIN"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      messageAPI.error({ title: 'Error', text: error.message })
    } else if (type !== "LOGIN") {
      messageAPI.info({ title: 'Info', text: "An email has been sent to you for verification!" })
      const res = await supabase.from('user').select().eq('email', email)
      if (res.data && res.data.length > 0) {
        await supabase.from('user').update({ password: password, user_uuid: data.user.id }).eq('email', email)
      }
      else {
        await supabase.from('user').insert({ user_type: USER_TYPE.NOT_SET, password: password, salt: 'test', email: email, user_uuid: data.user.id }).select()
      }
    } else {
      if (rememberMe) data.session.expires_at += 3600 * 24 * 10
      storgeUtils.saveSession(data.session)
      messageAPI.success({ title: 'Success', text: "You have successfully logged in :)" })

      const result = (await supabase.from('user').select().eq('user_uuid', data.session.user.id))
      if(result.data.at(0).user_type===USER_TYPE.STUDNET){
        const student = await supabase.from('user_student').select().eq('user_id',result.data.at(0).user_id)
        storgeUtils.saveUser({...student.data.at(0), user_type:USER_TYPE.STUDNET})
      }
      else if(result.data.at(0).user_type===USER_TYPE.TEACHER){
        const student = await supabase.from('user_teacher').select().eq('user_id',result.data.at(0).user_id)
        storgeUtils.saveUser({...student.data.at(0), user_type:USER_TYPE.TEACHER})
      }
      else {
        delete result.data.at(0)['password']
        storgeUtils.saveUser(result.data.at(0))}
      setTimeout(() => { navigate('/users/students'); dispathch(menuChange('/users/students')) }, 1000)
    }
  };
  const hidden1 = useMediaQuery('(min-width:1200px)')
  const hidden2 = useMediaQuery('(min-width:900px)')
  const hidden3 = useMediaQuery('(min-width:600px)')
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(wallhaven-gp7o6e.png)',
      backgroundSize: '100% 100%'
    }}>
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: hidden1 ? '1000px' : (hidden2 ? '700px' : (hidden3 ? '500px' : '380px')),
        height: '540px',
        translate: '-50% -50%',
        borderRadius: '20px',
        display: 'flex',
        overflow: 'hidden',
        pr: '40px',
        pl: hidden1 ? '0px' : (hidden3 ? '40px' : '20px'),
        backgroundImage: 'linear-gradient(to right bottom,#013fb2, #0062ca, #0083dc, #07a3e9, #56c2f4,#81bff9, #a5bcf8, #c2b9f1, #d8b8e7,#cba1e6, #bb8ce6, #a976e6, #9262e7)'
      }}>
        {/*left image*/}
        {hidden1 && <Box sx={{
          flex: '6',
          height: '100%',
          position: 'relative'
        }}>
          <Box sx={{
            backgroundImage: 'url(工作.svg)',
            position: 'absolute',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '440px',
            height: '440px',
            top: '50%',
            left: '50%',
            translate: '-50% -50%'
          }} />
        </Box>}

        {/*right information */}
        <Box sx={{
          flex: '4',
        }}>
          {/* information */}
          <Box sx={{
            paddingTop: '60px'
          }}>
            <Typography color={'rgb(131,93,192)'} fontWeight={'800'} fontSize={'36px'}>Login</Typography>
            <Typography color={'rgb(131,93,192)'} fontWeight={'100'} fontSize={'14px'}>Welcome to Scientific Management Platform. Please login to continue</Typography>
          </Box>
          {/* email and password input section */}
          <Box>
            <TextField value={email} name="email" placeholder="Email" size="small" sx={{
              mt: '50px',
              width: '100%',
              mr: '10px'
            }} InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ fontSize: '18px', color: 'rgb(131,93,192)', fontWeight: '700' }} />
                </InputAdornment>
              )
            }} onChange={(event) => { setEmail(event.target.value) }}></TextField>
            <TextField value={password} name="password" placeholder="Password" type="password" size="small" sx={{
              mt: '30px',
              width: '100%'
            }} InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ fontSize: '18px', color: 'rgb(131,93,192)' }} />
                </InputAdornment>
              )
            }} onChange={(event) => { setPassword(event.target.value) }}></TextField>
          </Box>
          {/* remember me and forget password section */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box>
              <FormControlLabel
                sx={{ '.MuiFormControlLabel-label': { color: '#b434ef8c' } }}
                control={
                  <Checkbox checked={rememberMe} onClick={() => { setRememberMe(!rememberMe) }} size="small" sx={{ color: '#b434ef8c', '&.Mui-checked': { color: "#b434ef8c" } }} icon={<RadioButtonUnchecked />} checkedIcon={<CheckCircle />} />}
                label='Remember Me' />
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <Link href="#" underline="none" color="#b434ef6e" sx={{
              }}>
                {"Forget Password?"}
              </Link>
            </Box>
          </Box>
          {/* login buttion */}
          <Box sx={{
            mt: '30px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <LoginButton onClick={() => { handleLogin("LOGIN") }}>
              Sign In
            </LoginButton>
            <Box display={'flex'} alignItems={'center'} fontSize={'20px'} color={'rgb(131,93,192,0.4)'}>
              or
            </Box>
            <LoginButton onClick={() => {
              if (canClick) {
                handleLogin("SIGN UP")
                setCanClick(false)
                setTimeout(() => { setCanClick(true) }, 1000)
              }
            }}>
              Sign Up
            </LoginButton>
          </Box>

        </Box>
      </Paper>
    </Box>
  )
}