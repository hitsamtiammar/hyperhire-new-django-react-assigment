import { Button, Grid,  MenuItem,  Typography,IconButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditForm from '@/components/data/EditForm';
import ListData, { ListDataRef } from '@/components/data/ListData';
import { useRef, useState } from 'react';

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

const DUMMY_DATA = {
        "id": "15e5ab97-8464-4314-9dd0-ad0bb206a425",
        "parent": "65d61ab2-06ae-4e6b-8289-977de2842089",
        "name": "Menus",
        "children": [
            {
                "id": "b6cae5a1-4848-4336-aa1c-6dbbe4a14251",
                "parent": "15e5ab97-8464-4314-9dd0-ad0bb206a425",
                "name": "Menu Registration",
                "children": [],
                "depth": 4
            }
        ],
        "depth": 3
    }


export default function Home() {
    const [menuExpanded, setMenuExpanded] = useState(false)
    const listMenuRef = useRef<ListDataRef>(null)

    function onExpandAll(){
        listMenuRef.current?.expandAll()
        setMenuExpanded(true)
        //setMenuExpanded(true)
    }

    function onCollapseAll(){
        listMenuRef.current?.collapseAll()
        setMenuExpanded(false)
    }
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
            <Grid marginBottom={10} item md={6} sm={12}>
                <Grid gap={2}  container direction="row">
                    <MenuButton onClick={onExpandAll} color="info" variant="contained">Expand All</MenuButton>
                    <MenuButton onClick={onCollapseAll} color="info" variant="outlined">Collapse All</MenuButton>
                </Grid>
                <ListData expanded={menuExpanded} ref={listMenuRef} data={{
                        name: 'Hehe',
                        children: [
                            {
                                name: 'Data scond',
                                children: [
                                    {
                                        name: 'Data hehe',
                                        children: []
                                    },
                                    {
                                        name: 'Data Haha',
                                        children: []
                                    },
                                ]
                            },
                            {
                                name: 'Data Third',
                                children: [
                                    {
                                        name: 'Data Jaja',
                                        children: [                                  
                                        {
                                            name: 'Data hehe',
                                            children: []
                                        },]
                                    },
                                    {
                                        name: 'Data Jojojojo',
                                        children: []
                                    },
                                ]
                            },
                            {
                                name: 'Data Third 34',
                                children: []
                            },
                        ]
                }}/>
            </Grid>
            <Grid item md={6} sm={12}>
                <EditForm/>
            </Grid>
        </Grid>
    </Container>
  )
}
