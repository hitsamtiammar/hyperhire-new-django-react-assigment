import { Box, BoxProps, Grid, IconButton, styled, Typography } from '@mui/material'
import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from 'react'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface ListDataItem{
    name: string
    children: ListDataItem[]
}

export interface ListDataProps{
    data: ListDataItem
    expanded?: boolean
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

export function ListData({ data, expanded: expandedProps = false } : ListDataProps, ref: Ref<ListDataRef>) {
    const [expanded, setExpanded] = useState(expandedProps)
    const [childExpanded, setChildExpaded] = useState(expandedProps)
    const [showAddBtn, setShowAddBtn] = useState(false)
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
    }

    useImperativeHandle(ref, () => ({
        collapseAll: () => {
            setChildExpaded(false)
        },
        expandAll: () => {
            setChildExpaded(true)
        },
        addNewItem: () => {

        }
    }))
  return (
    <Grid marginTop="24px" container direction="column">
       <ListDataBox onMouseEnter={onHover} onMouseLeave={onBlur} onClick={() => setExpanded(!expanded)}>
            {data.children.length > 0 && (
                <KeyboardArrowDownRoundedIcon/>
            )}
            <Typography>{data.name}</Typography>
            {showAddBtn && (
                <IconButton onClick={onAddBtnClicked} color='blue'>
                    <AddCircleIcon sx={{fontSize:'30px'}} />
                </IconButton>
            )}
         
       </ListDataBox>
       {expanded && (
            <Grid padding="0" container direction="row" item>
               <Box width="30px" sx={{ transform: 'translateX(12px)', borderLeft: '1px solid lightgray' }} display="flex"/>
               <Box display="flex" flexDirection="column" flex={1}>
                   {data.children.map(item => (
                      <ForwardedListData ref={listMenuRef} expanded={childExpanded} key={item.name} data={item} />
                   ))}
               </Box>
            </Grid>
       )}

    </Grid>
  )
}

const ForwardedListData = forwardRef(ListData)

export default ForwardedListData
