import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AgentTypeSelect from '../organisims/AgentTypeSelect';

export const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{backgroundColor: "#eeeeee", display: "flex", alignItems: "center", padding: "0 0 0 20px", gap: "10px", borderRadius: "10px"}}>
            <Typography sx={{color: "#000"}}>エージェントの種類</Typography>
            <AgentTypeSelect/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
