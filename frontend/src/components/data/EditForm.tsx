import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ListDataItem } from './ListData'
import { useEffect, useState } from 'react'
import { useDeleteMenuItemMutation, useUpdateMenuItemMutation } from '@/api/menuItemApi'
import { noop, showError } from '@/utils'

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

export interface EditFormProps{
    data: ListDataItem | null
    onDataMutated?: (data: ListDataItem) => void
}

export default function EditForm({ data, onDataMutated = noop }: EditFormProps) {
    const [name, setName] = useState(data?.name)
    const [updateMenuItem, { isLoading: isUpdateLoading }] = useUpdateMenuItemMutation()
    const [deleteMenuItem, { isLoading: isDeleteLoading }] = useDeleteMenuItemMutation()
    useEffect(() => {
        setName(data?.name)
    }, [data])

    async function onDelete(){
        try{
            await deleteMenuItem(data?.id as string)
            onDataMutated(data as ListDataItem)
        }catch(err){
            console.log('An error on delete', err)
            showError('An error on delete')
        }
    }

    async function onUpdate(){
        try{
            await updateMenuItem({
                id: data?.id as string,
                name: name as string
            })
            onDataMutated(data as ListDataItem)
        }catch(err){
            console.log('An error on update', err)
            showError('An error on update')
        }
    }

    if(!data){
        return null
    }

    return (
        <Grid container direction="column">
            <BoxInput>
                <Typography fontSize="14px" color="secondary.light">Menu ID</Typography>
                <EditFormTextField fullWidth disabled InputProps={{
                    disableUnderline: true,
                }} value={data.id} />
            </BoxInput>
            <BoxInput>
                <Typography fontSize="14px" color="secondary.light">Depth</Typography>
                <EditFormTextField disabled InputProps={{
                    disableUnderline: true,
                }} value={data.depth} />
            </BoxInput>
            <BoxInput>
                <Typography fontSize="14px" color="secondary.light">Parent Data</Typography>
                <EditFormTextField disabled InputProps={{
                    disableUnderline: true,
                }} value={data.parent || ''} />
            </BoxInput>
            <BoxInput>
                <Typography fontSize="14px" color="secondary.light">Name</Typography>
                <EditFormTextField InputProps={{
                    disableUnderline: true,
                }} value={name} onChange={(e) => setName(e.target.value)} />
            </BoxInput>
            <Grid container direction="row">
                <SubmitButton disabled={isDeleteLoading || isUpdateLoading} onClick={onUpdate} variant="contained" fullWidth color="blue">Save</SubmitButton>
                <SubmitButton disabled={isDeleteLoading || isUpdateLoading} onClick={onDelete} variant="contained" fullWidth color="error">Delete</SubmitButton>
            </Grid>
        </Grid>
    )
}
