import NotLoggedRedirect from 'components/Redirect/Redirect'
import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
import './Layout.scss'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserStore from 'stores/UserStore';
import ProfileBlock from 'components/ProfileBlock/ProfileBlock';
import AppStoreContext from 'context/AppStoreContext';
import axios from 'axios';

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = observer(({ children }) => {
    const { user } = UserStore
    const appStore = useContext(AppStoreContext)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${appStore.authToken}`
        console.log(`Bearer ${appStore.authToken}`);
    }, [appStore.authToken])

    return (
        <>
            <AppBar className='header' position='sticky'>
                <Toolbar>
                    <img className='header__logo' src='/assets/logo.svg' alt='logo' width={44} />
                    <Typography className='header__link' variant="h6" component="a" href='/' sx={{ flexGrow: 1 }}>
                        Лента идей
                    </Typography>
                    <Typography className='header__link' variant="h6" component="a" href='/tinder' sx={{ flexGrow: 1 }}>
                        Tidear
                    </Typography>
                    {/* <Typography className='header__link' variant="h6" component="a" href='idea/create' sx={{ flexGrow: 1 }}>
                        Создать идею
                    </Typography> */}
                    {user && appStore.isAuthenticated()
                        ? <ProfileBlock {...user} />
                        : <Link className='header__link' to={'/login'}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <LoginRounded />
                            </IconButton>
                        </Link>}
                </Toolbar>
            </AppBar>
            {children}
        </>
    )
})

export default Layout