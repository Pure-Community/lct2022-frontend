import URLS from 'constants/urls'
import React, { FC, ReactNode } from 'react'
import { API } from 'utils/requests'
import './Wallpaper.scss'

const Wallpaper: FC<{ url: string, videoUrl?: string, children?: ReactNode, className?: string }>
    = ({ url, children, className, videoUrl }) => {
        console.log(url);

        function resolveWallpaper() {
            if (videoUrl) {
                return (
                    <div className='wallpaper'>
                        <video autoPlay muted loop className='wallpaper__video-container'>
                            <source src={`${API}${URLS.video(url)}`} />
                        </video>
                        <div className={`wallpaper ${className}`}>
                            {children}
                        </div>
                    </div>
                )
            } else if (url) {
                return <div
                    className={`wallpaper ${className}`}
                    style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.232879) 15.1%, rgba(0, 0, 0, 0.441667) 28.65%, rgba(0, 0, 0, 0.51053) 43.23%, rgba(0, 0, 0, 0.606448) 63.54%, rgba(0, 0, 0, 0.670043) 75.52%, rgba(0, 0, 0, 0.8) 100%), url(${API}${URLS.photo(url)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
                    {children}
                </div>
            }
            return (
                <div
                    className={`wallpaper ${className}`}
                    style={{ background: `linear-gradient(180deg, rgba(14, 0, 102, 0.1) 0%, rgba(32, 0, 101, 0.3396) 23.96%, rgba(34, 0, 65, 0.7) 50%, rgba(39, 0, 55, 0.8344) 73.44%, #330037 100%, #330037 100%)` }} >
                    {children}
                </div>
            )
        }

        return (resolveWallpaper())
    }

export default Wallpaper