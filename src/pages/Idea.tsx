import { AccountCircleOutlined, FavoriteBorderOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import Wallpaper from 'components/Wallpaper/Wallpaper'
import URLS from 'constants/urls'
import IIdea from 'interfaces/IIdea'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { API, sendRequest } from 'utils/requests'
import './Idea.scss'

const Idea: FC = () => {
    const [ideaData, setIdeaData] = useState<IIdea>()
    const location = useLocation()

    useEffect(() => {
        const id = location.pathname.split('/').pop()
        if (id) {
            sendRequest('get', URLS.idea(id))
                .then(res => setIdeaData(res))
        }
    }, [])



    return (
        <>
            {ideaData
                ? <>
                    {
                        ideaData.photo_ids
                            && ideaData.photo_ids[0]
                            ? <Wallpaper url={ideaData.logo_id ?? ideaData.photo_ids[0]} videoUrl={ideaData.video_id} className='page-idea__header'>
                                <h1>
                                    {ideaData.title.replace('Инстаграм', 'Инстаграм* \n (ПРОДУКТ КОМАНИИ Meta** - ЗАПРЕЩЕННОЙ В РОССИИ ЭКСТРЕМИСТСКОЙ ОРГАНИЗАЦИИ)')}
                                </h1>
                                <div className='page-idea__description'>
                                    <AccountCircleOutlined className='page-idea__author-icon' />
                                    {ideaData.author.login}
                                    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="11.5" y1="36" x2="11.5" stroke="#E8B7D5" />
                                    </svg>
                                    <p className='page-idea__likes'>{ideaData.likes_count}</p>
                                    <FavoriteBorderOutlined />
                                    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="11.5" y1="36" x2="11.5" stroke="#E8B7D5" />
                                    </svg>
                                    <Button variant='contained' color="secondary">
                                        Подписаться
                                    </Button>
                                    <Button variant='contained' color="secondary">
                                        Присоединиться
                                    </Button>
                                </div>
                            </Wallpaper> : null
                    }
                    <div className='page-idea'>{ideaData.description}</div>
                </>
                : <div>loader</div>}
        </>
    )
}

export default Idea