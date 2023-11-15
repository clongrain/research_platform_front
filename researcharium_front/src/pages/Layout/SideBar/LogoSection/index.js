import { Stack, Box } from "@mui/material"
import {ReactComponent as ClusterManagement} from "@/assets/ClusterManagement.svg";
export default function LogoSection(){
    return (
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          sx={{
            height: '40px',
            maxWidth: '182px',
            backgroundColor: 'rgb(36, 46, 66)',
            boxShadow: 'rgba(36, 46, 66, 0.2) 0px 8px 16px 0px',
            padding: '12px 14px 12px 14px',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
            <Box sx={{ paddingRight: '10px' }}>
              <ClusterManagement />
            </Box>
            <Stack
              spacing={0.5}
              justifyContent='flex-start'
              alignItems='flex-start'
            >
                <Box
                  sx={{
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontFamily:
                      'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                  }}
                >
                    hhh
                </Box>
                <Box
                  sx={{
                    color: '#d8dee5',
                    fontWeight: 400,
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontFamily:
                      'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                    textAlign: 'center',
                  }}
                >
                    集群
                </Box>
            </Stack>
        </Stack>
    )
}