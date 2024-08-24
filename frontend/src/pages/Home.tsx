import { Button, Grid,  MenuItem,  Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditForm from '@/components/data/EditForm';

const Container = styled(Grid)(() => ({
    margin: '35px 48px',
}))

const MenuSelect = styled(Select)(({ theme }) => ({
    width: '349px',
    borderRadius: '16px',
    backgroundColor: theme.palette.warning.main
}))

const MenuAvatar = styled(Avatar)(({theme}) => ({
    width: 52,
    marginRight: '16px',
    height: 52,
    backgroundColor: theme.palette.blue.main
}))

const MenuButton = styled(Button)(({theme}) => ({
    borderRadius: '48px',
    borderColor: theme.palette.info.main,
    minWidth: '133px'
}))

export default function Home() {
  return (
    <Container>
        <Grid height="84px" direction="row" container >
            <FolderIcon sx={{ fontSize: '20px', marginRight: '20px' }} color="lightgray" />
            <Typography>/ Menus</Typography>
        </Grid>
        <Grid sx={{ height: '84px' }} container alignItems="center" direction="row">
            <MenuAvatar>
                <MenuRoundedIcon sx={{ fontSize: '24px'}} color="white"/>
            </MenuAvatar>
            <Typography fontSize="32px" fontWeight={800} color="lime">Menus</Typography>
        </Grid>
        <FormControl sx={{ m: 1, minWidth: 120, marginTop: 4 }}>
            <Typography color="secondary.light">Menu</Typography>
            <MenuSelect>
                <MenuItem value="1234-3452-3345-3421">System Management</MenuItem>
                <MenuItem onClick={(e) => e.preventDefault()}>
                    <Button fullWidth variant="contained" color="blue">Add new Item</Button>
                </MenuItem>
            </MenuSelect>
        </FormControl>
        <Grid container marginTop="28px" direction="row">
            <Grid item md={6} sm={12}>
                <Grid gap={2}  container direction="row">
                    <MenuButton color="info" variant="contained">Expand All</MenuButton>
                    <MenuButton color="info" variant="outlined">Collapse All</MenuButton>
                </Grid>
            </Grid>
            <Grid item md={6} sm={12}>
                <EditForm/>
            </Grid>
        </Grid>
    </Container>
  )
}
