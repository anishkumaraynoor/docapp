import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export default function Header() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img height={'50'} width={'50'} src="https://i.postimg.cc/jCVgPC9C/download-1-removebg-preview.png" alt="" />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              DOC APP
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }