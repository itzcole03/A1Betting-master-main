import React from 'react.ts';
import Navbar from './Navbar.ts'
import Sidebar from './Sidebar.ts'
import { Box, Container } from '@mui/material.ts'
import { ReactNode } from 'react.ts'


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }} key={680838}>
      <Navbar / key={593897}>
      <Sidebar / key={403360}>
      <Box;
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          pt: 8,
          px: 3,
        }}
       key={666200}>
        <Container maxWidth="lg" key={108807}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout;
