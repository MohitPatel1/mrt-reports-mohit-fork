import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import { MRT_TableInstance } from 'material-react-table';

import { SearchPanel } from './search_panel';

const drawerWidth = 300;

type SettingsPosition = 'left-drawer' | 'right-drawer' | 'bottom' | 'top' | 'floating';

export interface SmartTableSettingsProps<TData extends Record<string, any>> {
  position?: SettingsPosition;
  table: MRT_TableInstance<TData>;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'flex-end',
  minHeight: 64,
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'drawerWidth',
})<{ isOpen?: boolean; drawerWidth: number }>(({ theme, isOpen, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const SmartTableSettings = <TData extends Record<string, any>>({
  position = 'right-drawer',
  table,
}: SmartTableSettingsProps<TData>): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState<string | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setActivePanel(null);
  };

  const handlePanelClick = (panelName: string) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  const onSearch = (searchTerm: string) => {
    table.setGlobalFilter(searchTerm);
  };

  const settingsContent = (
      <List>
        <ListItem>
          <Typography variant="h6">Table Settings</Typography>
        </ListItem>
        <Divider />
            <ListItem>
              <ListItemButton onClick={() => handlePanelClick('search')}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <SearchPanel
              open={activePanel === 'search'}
              onSearch={onSearch}
            />
      </List>
  );

  if (position === 'top' || position === 'bottom') {
    return (
      <Box sx={{ display: 'flex' }}>
        <StyledAppBar 
          position="fixed"
          isOpen={open}
          drawerWidth={drawerWidth}
          sx={{ 
            top: position === 'bottom' ? 'auto' : 0,
            bottom: position === 'bottom' ? 0 : 'auto'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <TuneIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Table Settings
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <Drawer
          anchor={position}
          open={open}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: { width: '100%', maxHeight: '50vh' }
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          {settingsContent}
        </Drawer>
      </Box>
    );
  }

  // Default drawer (left or right)
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        onClick={handleDrawerOpen}
        sx={{
          position: 'fixed',
          [position === 'left-drawer' ? 'left' : 'right']: 16,
          top: 16,
          zIndex: (theme) => theme.zIndex.drawer - 1,
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <TuneIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor={position === 'left-drawer' ? 'left' : 'right'}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        {settingsContent}
      </Drawer>
    </Box>
  );
};