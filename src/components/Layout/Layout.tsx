import NotLoggedRedirect from 'components/Redirect/Redirect'
import React, { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <NotLoggedRedirect />
            <header >
                dfsfd
            </header>
            {children}
        </>
    )
}

export default Layout