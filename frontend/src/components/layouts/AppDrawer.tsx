import { Toolbar, List,  IconButton, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme, useMediaQuery } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { CLOIT_LOGO, OPEN_MENU, PROPERTIES } from '@/assets/logo';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { noop } from '@/utils';

export const drawerWidth = '255px';

const DrawerInnerList = styled(List)(({theme}) => ({
    margin: '0px 16px',
    backgroundColor: theme.palette.info.main,
    borderRadius: '16px'
}))
const DrawerTransparentInnerList = styled(List)(() => ({
    margin: '0px 16px',
    borderRadius: '16px'
}))

export interface AppDrawerProps{
  open: boolean
  onClose: () => void
}

export default function AppDrawer({ open = false, onClose=noop }: AppDrawerProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: 'primary.main',
        color: 'secondary.main',
        borderRadius: '24px',
      },
    }}
    variant={!matches ? 'temporary' :"permanent"}
    anchor="left"
    open={open}
  >
    <Toolbar>
        <Grid height="84px" container direction="row" justifyContent="space-between">
            <img src={CLOIT_LOGO} alt='Cloit Logo' />
            <IconButton onClick={onClose}>
                <img src={OPEN_MENU} alt="Open Menu"/>
            </IconButton>
        </Grid>
    </Toolbar>
    <DrawerInnerList>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon color="white" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{
                color: 'white.main',
                fontWeight: 700,
                fontSize:'14px'
              }} primary="System" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={PROPERTIES} alt="Properties"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize:'14px' }} primary="SystemCode" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={PROPERTIES} alt="Properties"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize:'14px' }} primary="Properties" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ backgroundColor: 'lime.main', borderRadius: '16px' }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={PROPERTIES} alt="Menus"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize:'14px', fontWeight:700, color: 'lime.contrastText' }} primary="Menus" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={PROPERTIES} alt="API List"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize:'14px' }} primary="API List" />
            </ListItemButton>
          </ListItem>
    </DrawerInnerList>
    <DrawerTransparentInnerList>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderOutlinedIcon color="gray"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontWeight: 500, fontSize:'14px' }} primary="User & Group" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderOutlinedIcon color="gray"/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontWeight: 500, fontSize:'14px' }} primary="Competition" />
            </ListItemButton>
          </ListItem>
    </DrawerTransparentInnerList>
  </Drawer>
  )
}
