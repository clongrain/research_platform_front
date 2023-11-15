import { Box, Grid, Stack, Button } from "@mui/material"
import {ReactComponent as Workbench} from "@/assets/Workbench.svg"
import {ReactComponent as Gear} from "@/assets/Gear.svg"
import { fontFamily } from "@/utils/commonUtils"

export default function Header(){

    const styledButton = {
        borderRadius: '100px',
        backgroundColor: 'transparent',
        color: '#36435C !important',
        fontFamily: fontFamily,
      };

    return(
        <Box
          sx={{
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: '#EFF4F9',
            fontFamily: fontFamily,
          }}
        >
          <Grid container spacing={0}>
            <Grid xs={3}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ height: '100%', ml: '20px' }}
              >
                <Button sx={styledButton}>
                  <Gear />
                  <span
                    style={{
                      marginLeft: '12px',
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: 1.67,
                    }}
                  >
                    平台管理
                  </span>
                </Button>
                <Button sx={styledButton}>
                  <Workbench />
                  <span
                    style={{
                      marginLeft: '12px',
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: 1.67,
                    }}
                  >
                    工作台
                  </span>
                </Button>
              </Stack>
            </Grid>  
            <Grid xs={6}>
              <Stack
                direction='row'
                spacing={6}
                justifyContent='center'
                alignItems='center'
              >
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: '30px',
                    color: '#242e42',
                    fontFamily: 'Segoe Print',
                  }}
                >
                  Scientific Management Platform
                </Box>
              </Stack>
            </Grid>
            <Grid xs={3}></Grid>
          </Grid>
        </Box>
    )
}
