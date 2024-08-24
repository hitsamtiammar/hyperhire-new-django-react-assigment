import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const EditFormTextField = styled(TextField)(({theme}) => ({
    backgroundColor: theme.palette.warning.main,
    border: 'none',
    borderRadius: '100px',
    height: '52px',
    minWidth: '262px',
    "& fieldset": { border: 'none' },
}))

const BoxInput = styled(Box)({
    marginBottom: '17px'
})

const SubmitButton = styled(Button)({
    width: '263px',
    borderRadius:'48px'
})

export default function EditForm() {
  return (
    <Grid container direction="column">
        <BoxInput>
            <Typography fontSize="14px" color="secondary.light">Menu ID</Typography>
            <EditFormTextField fullWidth disabled InputProps={{
                disableUnderline: true,
            }} value="3452-2344-3244-3242-234" />
        </BoxInput>
        <BoxInput>
            <Typography fontSize="14px" color="secondary.light">Depth</Typography>
            <EditFormTextField disabled InputProps={{
                disableUnderline: true,
            }} value={3} />
        </BoxInput>
        <BoxInput>
            <Typography fontSize="14px" color="secondary.light">Parent Data</Typography>
            <EditFormTextField disabled InputProps={{
                disableUnderline: true,
            }} value="System" />
        </BoxInput>
        <BoxInput>
            <Typography fontSize="14px" color="secondary.light">Name</Typography>
            <EditFormTextField InputProps={{
                disableUnderline: true,
            }} value="Status code"/>
        </BoxInput>
        <SubmitButton variant="contained" fullWidth color="blue">Save</SubmitButton>
    </Grid>
  )
}
