import { ContentPaper } from "@/components/StyledPaper/ContentPaper";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import StepperContentTable from "./StepperContentTable";
import { useDispatch, useSelector } from "react-redux";
import { setMaterialType } from "@/action/MaterialProductionAction";
import ExportOrder from "./ExportOrder";

export default function MaterialProduction() {
  const steps = ['Choose template', 'Select achievements', 'Set export order']
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const {materialType} = useSelector(state=>state.MaterialProduction)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setMaterialType(event.target.value))
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Container maxWidth='false'>
      <ContentPaper sx={{
        padding: '24px'
      }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step}>
              <StepLabel>
                {step}
              </StepLabel>
              <StepContent>
                {index === 0 ?
                  <Stack gap={'24px'}>
                    <Box>
                      <FormControl size="small" sx={{
                        maxWidth: '300px',
                        minWidth: '200px'
                      }}>
                        <InputLabel>模板类型</InputLabel>
                        <Select
                          value={materialType}
                          label="模板类型"
                          onChange={handleChange}
                        >
                          <MenuItem value={'职称评定'}>职称评定</MenuItem>
                          <MenuItem value={'项目结题'}>项目结题</MenuItem>
                          <MenuItem value={'成果报奖'}>成果报奖</MenuItem>
                          <MenuItem value={'年度总结'}>年度总结</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={
                          handleNext
                        }
                        sx={{
                          textTransform: 'none',
                          borderRadius: '10px',
                          padding: '8px 20px',
                        }}
                      >
                        Continue
                      </Button>
                      <Button
                        disabled
                        onClick={handleBack}
                        sx={{
                          ml: '16px',
                          textTransform: 'none',
                          borderRadius: '10px',
                          padding: '8px 20px',
                        }}
                      >
                        Back
                      </Button>
                    </Box>
                  </Stack> : index === 1 ? <StepperContentTable handleNext={handleNext} handleBack={handleBack} /> :
                    <ExportOrder handleBack={handleBack} handleNext={handleNext} />
                }
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Button variant="contained" onClick={handleReset} sx={{
              mt: 1, mr: 1,
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
            }}>
              重新生成
            </Button>
          </Paper>
        )}
      </ContentPaper>
    </Container >
  )
}