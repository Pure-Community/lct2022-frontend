import URLS from 'constants/urls'
import React, { FC, ReactNode } from 'react'
import { API } from 'utils/requests'
import './Wallpaper.scss'

const Wallpaper: FC<{ url: string, children?: ReactNode, className?: string }> = ({ url, children, className }) => {
    console.log(url);

    return (
        <div
            className={`wallpaper ${className}`}
            style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.232879) 15.1%, rgba(0, 0, 0, 0.441667) 28.65%, rgba(0, 0, 0, 0.51053) 43.23%, rgba(0, 0, 0, 0.606448) 63.54%, rgba(0, 0, 0, 0.670043) 75.52%, rgba(0, 0, 0, 0.8) 100%), url(${API}${URLS.photo(url)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
            {children}
        </div>
    )
}

export default Wallpaper