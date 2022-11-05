import NotLoggedRedirect from 'components/Redirect/Redirect'
import React, { FC, ReactNode } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
import './Layout.scss'
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <AppBar className='header' position='sticky'>
                <Toolbar>
                    <img className='header__logo' src='/assets/logo.svg' alt='logo' width={44} />
                    <Typography className='header__link' variant="h6" component="a" href='/' sx={{ flexGrow: 1 }}>
                        Лента идей
                    </Typography>
                    <Typography className='header__link' variant="h6" component="a" href='/tinder' sx={{ flexGrow: 1 }}>
                        Не тиндер
                    </Typography>
                    <Typography className='header__link' variant="h6" component="a" href='idea/create' sx={{ flexGrow: 1 }}>
                        Создать идею
                    </Typography>
                    <Link className='header__link' to={'/login'}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <LoginRounded />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            {children}
        </>
    )
}

export default Layout