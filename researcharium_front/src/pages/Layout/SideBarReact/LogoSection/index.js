import { Box, Typography } from "@mui/material"
const LogoSection = ()=>{
    return (
        <Box display={'flex'} width={'3rem'} alignItems={'center'} p={2}>
            <img width={'100%'} src="/20231027-001407.jpg"></img>
            <Typography textAlign={'center'} color={'greenyellow'} fontWeight={'700'}>ICES</Typography>
        </Box>
    )
}

export default LogoSection