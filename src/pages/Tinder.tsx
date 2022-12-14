import { AccountCircleOutlined, BookmarkAddOutlined, CloseOutlined, FavoriteBorderOutlined, ThumbDownAltOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import axios from 'axios'
import { Wallpaper } from 'components'
import ProtectedLogin from 'components/ProtectedLogin/ProtectedLogin'
import URLS from 'constants/urls'
import AppStoreContext from 'context/AppStoreContext'
import useAuthorization from 'hooks/useAuthorization'
import IIdea from 'interfaces/IIdea'
import React, { FC, useContext, useEffect, useState } from 'react'
import { API, sendRequest } from 'utils/requests'
import './Tinder.scss'

const Tinder: FC = () => {
    const [idea, setIdea] = useState<IIdea>()
    const appStore = useContext(AppStoreContext)
    useAuthorization(appStore.authToken)

    const loadNext = async () => {
        sendRequest('get', URLS.getNext)
            .then(res => {
                if (!res.error) setIdea(res)
            })
    }

    const dislike = async () => {
        if (idea?.id) {
            sendRequest('post', URLS.ideaDislike(idea?.id)).then(_ => loadNext())
        }
    }

    const like = async () => {
        if (idea?.id) {
            sendRequest('post', URLS.ideaLike(idea?.id)).then(_ => loadNext())
        }
    }

    const join = async () => {
        if (idea?.id) {
            sendRequest('post', URLS.ideaJoinRequest(idea?.id)).then(_ => loadNext())
        }
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${appStore.authToken}`
        console.log(appStore.authToken);

        loadNext()
    }, [appStore.authToken])

    return (
        <ProtectedLogin>
            <main className='page-tinder'>
                {idea && <div className='page-tinder__content'>
                    <Wallpaper url={idea.logo_id ? idea.logo_id : idea.photo_ids ? idea.photo_ids[0] : ''} videoUrl={idea.video_id} className='page-tinder__idea'>
                        <h1>
                            {idea.title.replace('Инстаграм', 'Инстаграм* \n (ПРОДУКТ КОМАНИИ Meta** - ЗАПРЕЩЕННОЙ В РОССИИ ЭКСТРЕМИСТСКОЙ ОРГАНИЗАЦИИ)')}
                        </h1>
                        <div className='page-idea__description'>
                            <AccountCircleOutlined className='page-idea__author-icon' />
                            {idea.author.login}
                            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="11.5" y1="36" x2="11.5" stroke="#E8B7D5" />
                            </svg>
                            <p className='page-idea__likes'>{idea.likes_count}</p>
                            <FavoriteBorderOutlined />
                            {/* <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="11.5" y1="36" x2="11.5" stroke="#E8B7D5" />
                            </svg> */}
                            {/* <Button variant='contained' color="secondary">
                                Подписаться
                            </Button>
                            <Button variant='contained' color="secondary">
                                Присоединиться
                            </Button> */}
                        </div>
                    </Wallpaper>
                    {idea && <div className='page-tinder__buttons'>
                        <IconButton className='page-tinder__icon-button' onClick={() => {
                            dislike()
                        }}>
                            <CloseOutlined />
                        </IconButton>
                        <IconButton className='page-tinder__icon-button'
                            onClick={() => {
                                join()
                            }}>
                            <BookmarkAddOutlined />
                        </IconButton>
                        <IconButton className='page-tinder__icon-button'
                            onClick={() => {
                                like()
                            }}>
                            <FavoriteBorderOutlined />
                        </IconButton>
                    </div>}
                </div>}
            </main>
        </ProtectedLogin >
    )
}

export default Tinder