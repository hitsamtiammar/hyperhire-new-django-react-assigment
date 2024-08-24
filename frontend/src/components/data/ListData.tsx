import { Box, BoxProps, Grid, IconButton, styled, TextField, Typography } from '@mui/material'
import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from 'react'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Close } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { noop } from '@/utils';

export interface ListDataItem{
    id: string;
    name: string;
    parent?: string | null
    children: ListDataItem[];
    depth: number
    tempId?:string
}

export interface ListDataProps{
    data: ListDataItem
    expanded?: boolean
    onCancelItemSelected: (index: string) => void
    onItemSelected: (item: ListDataItem) => void
}

export interface ListDataRef{
    expandAll: () => void;
    collapseAll: () => void
    addNewItem: () => void;
}

const ListDataBox = styled((props: BoxProps) => 
    <Box display="flex" gap={2} flexDirection="row" alignItems="center" {...props} />)(
    {
        cursor: 'pointer', 
        height: '50px',
        userSelect: 'none'
    })

export function ListData({ onCancelItemSelected = noop, onItemSelected = noop, data, expanded: expandedProps = false } : ListDataProps, ref: Ref<ListDataRef>) {
    const [expanded, setExpanded] = useState(expandedProps)
    const [childExpanded, setChildExpaded] = useState(expandedProps)
    const [showAddBtn, setShowAddBtn] = useState(false)
    const [childrenData, setChildrenData] = useState(data.children)
    const listMenuRef = useRef<ListDataRef>(null)

    useEffect(() => {
        setExpanded(expandedProps)
    },[expandedProps])

    const onHover = () => {
        setShowAddBtn(true)
    }
    const onBlur = () => {
        setShowAddBtn(false)
    }

    const onAddBtnClicked = (e:React.MouseEvent) => {
        e.stopPropagation()
        setExpanded(true)
        setChildrenData([...childrenData, {
            children: [],
            depth: 0,
            id: '',
            name: '',
            parent: null,
            tempId: `temp-${new Date().getTime()}`
        }])
    }

    useImperativeHandle(ref, () => ({
        collapseAll: () => {
            setChildExpaded(false)
        },
        expandAll: () => {
            setChildExpaded(true)
        },
        addNewItem: () => {
            console.log('ch', childrenData.length)
        }
    }))

    function onCancel(){
        // console.log('Cancelled data', { i: data.index, data})
        onCancelItemSelected(data.tempId as string)
        
    }

    function onCancelConfirmed(tempId: string){
        const newChildren = childrenData.filter((item) => item.tempId !== tempId)
        setChildrenData(newChildren)
    }

    function onItemSelectedDblClick(e: React.MouseEvent){
        e.stopPropagation()
        console.log('Item seleced triggered')
        onItemSelected(data)
    }

    function renderItem(){
        return (
            <>
                {data.children.length > 0 && (
                    <Box onClick={() => setExpanded(!expanded)}>
                        <KeyboardArrowDownRoundedIcon/>
                    </Box>
                )}
                <Typography>{data.name}</Typography>
                {showAddBtn && (
                    <IconButton onClick={onAddBtnClicked} color='blue'>
                        <AddCircleIcon sx={{fontSize:'30px'}} />
                    </IconButton>
                )}
            </>
        )
    }

    function renderAddItem(){
        return (
            <>
                <TextField/>
                <IconButton>
                    <CheckIcon color="success" />
                </IconButton>
                <IconButton onClick={onCancel}>
                    <Close color="error" />
                </IconButton>
            </>
        )
    }

    return (
        <Grid marginTop="24px" container direction="column">
        <ListDataBox onDoubleClick={onItemSelectedDblClick} onMouseEnter={onHover} onMouseLeave={onBlur}>
            {data.id !== '' ? renderItem() : renderAddItem()}
        </ListDataBox>
        {expanded && (
                <Grid padding="0" container direction="row" item>
                <Box width="30px" sx={{ transform: 'translateX(12px)', borderLeft: '1px solid lightgray' }} display="flex"/>
                <Box display="flex" flexDirection="column" flex={1}>
                    {childrenData.map(item => {
                       return <ForwardedListData onItemSelected={onItemSelected} onCancelItemSelected={onCancelConfirmed} ref={listMenuRef} expanded={childExpanded} key={item.name || item.tempId} data={item} />
                    })}
                </Box>
                </Grid>
        )}

        </Grid>
    )
}

const ForwardedListData = forwardRef(ListData)

export default React.memo(ForwardedListData)
