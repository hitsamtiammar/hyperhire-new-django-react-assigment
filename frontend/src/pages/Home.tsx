import { Button, Grid,  MenuItem,  Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import EditForm from '@/components/data/EditForm';
import ListData, { ListDataItem, ListDataRef } from '@/components/data/ListData';
import React, { useEffect, useRef, useState } from 'react';
import { useAddMenuItemMutation, useGetRootMenuItemQuery, useLazyGetAllDataFromRootIdQuery } from '@/api/menuItemApi';
import Swal from 'sweetalert2';
import { showError } from '@/utils';

const Container = styled(Grid)(() => ({
    margin: '35px 48px',
}))

const MenuSelect = styled((props: SelectProps) => <Select onChange={props.onChange} {...props} />)(({ theme }) => ({
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
    const [menuExpanded, setMenuExpanded] = useState(false)
    const listMenuRef = useRef<ListDataRef>(null)
    const [selectedItem, setSelectedItem] = useState<ListDataItem | null>(null)
    const { data: rootData, isLoading, refetch } = useGetRootMenuItemQuery()
    const [addNewItem] = useAddMenuItemMutation()
    const [fetchDataByRootId] = useLazyGetAllDataFromRootIdQuery()
    const [listData, setListData] = useState<ListDataItem | null>(null)
    const [currRoot, setCurrRoot] = useState('')

    useEffect(() => {
        if(menuExpanded){
            setSelectedItem(null)
        }
    }, [menuExpanded])
    
    function onExpandAll(){
        listMenuRef.current?.expandAll()
        setMenuExpanded(true)
        //setMenuExpanded(true)
    }

    function onCollapseAll(){
        listMenuRef.current?.collapseAll()
        setMenuExpanded(false)
    }

    async function loadRootData(currRoot: string){
        try{
            const result = await fetchDataByRootId(currRoot)
            const resultData = result.data?.data
            setListData(resultData as ListDataItem)
        }catch(err){
            console.log('error on load root data', err)
            showError('An error on load Root Data')
        }
    }

    async function onSelectRootData(e: SelectChangeEvent){
        console.log('Selected', e.target.value)
        setCurrRoot(e.target.value)
        if(e.target.value){
            await loadRootData(e.target.value)
        }
    }

    function onDataMutated(data: ListDataItem){
        setListData(null)
        setSelectedItem(null)
        if(data.parent){
            loadRootData(currRoot)
        }else{
            refetch()
        }
    }

    function onRootDataMutated(){
        setListData(null)
        setSelectedItem(null)
        refetch()
    }

    async function doInsert(name: string, parentId: string, callback: () => void){
        try{
            await addNewItem({
                name,
                parent: parentId || null
            })
            callback()
        }catch(err){
            console.log('error on add confirmed', err)
            showError('An error on Insertion')
        }
    } 

    async function onAddConfirmed(name: string, parentId: string){
        await doInsert(name, parentId, () => {
            loadRootData(currRoot)
        })
    }

    async function onAddRootClicked(e:React.MouseEvent){
        e.preventDefault()
        const { value } = await Swal.fire({
            title: "New Root Data",
            input: "text",
            inputLabel: "Enter your new Root data",
            inputValue: '',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
          });
        await doInsert(value, '', () => onRootDataMutated())
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
                <MenuSelect onChange={onSelectRootData} value={currRoot} disabled={isLoading}>
                    {rootData?.data.map(item => (
                        <MenuItem key={item.menu_id} value={item.menu_id}>{item.name}</MenuItem>
                    ))}
                    <MenuItem onClick={onAddRootClicked}>
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
                    {!isLoading && <ListData onAddConfirmed={onAddConfirmed} onItemSelected={(item) => setSelectedItem(item)} expanded={menuExpanded} ref={listMenuRef} data={listData as ListDataItem}/>}
                </Grid>
                <Grid item md={6} sm={12}>
                    <EditForm onDataMutated={onDataMutated} data={selectedItem} />
                </Grid>
            </Grid>
        </Container>
    )
}
