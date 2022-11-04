import NotLoggedRedirect from 'components/Redirect/Redirect'
import React, { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <header >
            </header>
            {children}
        </>
    )
}

export default Layout