import { BookmarkAddOutlined, CloseOutlined, FavoriteBorderOutlined, ThumbDownAltOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import axios from 'axios'
import ProtectedLogin from 'components/ProtectedLogin/ProtectedLogin'
import URLS from 'constants/urls'
import AppStoreContext from 'context/AppStoreContext'
import IIdea from 'interfaces/IIdea'
import React, { useContext, useEffect, useState } from 'react'
import { API, sendRequest } from 'utils/requests'
import './Tinder.scss'

const Tinder = () => {
    const [idea, setIdea] = useState<IIdea>()
    const appStore = useContext(AppStoreContext)

    const loadNext = async () => {
        sendRequest('get', URLS.getNext)
            .then(res => {
                if (!res.error) setIdea(res)
            })
    }

    const like = async () => {
        if (idea?.id) {
            sendRequest('post', URLS.ideaLike(idea?.id))
        }
    }

    const join = async () => {
        if (idea?.id) {
            sendRequest('post', URLS.ideaJoinRequest(idea?.id))
        }
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${appStore.authToken}`
        console.log(appStore.authToken);

        loadNext()
    }, [appStore.authToken])

    function resolveWallpaper() {
        if (idea?.video_id) {
            return <video className='page-tinder__media'>
                <source src={`${API}${URLS.video(idea.video_id)}`} />
            </video>
        } else if (idea?.logo_id) {
            return <img className='page-tinder__media' src={`${API}${URLS.photo(idea.logo_id)}`} />
        } else if (idea?.photo_ids && idea.photo_ids[0]) {
            return <img className='page-tinder__media' src={`${API}${URLS.photo(idea.photo_ids[0])}`} />
        }
    }

    return (
        <ProtectedLogin>
            <main className='page-tinder'>
                <div className='page-tinder__content'>
                    <div className="page-tinder__idea">
                        {resolveWallpaper()}
                    </div>
                    {idea && <div className='page-tinder__buttons'>
                        <IconButton className='page-tinder__icon-button' onClick={() => loadNext()}>
                            <CloseOutlined />
                        </IconButton>
                        <IconButton className='page-tinder__icon-button'
                            onClick={() => {
                                join()
                                loadNext()
                            }}>
                            <BookmarkAddOutlined />
                        </IconButton>
                        <IconButton className='page-tinder__icon-button'
                            onClick={() => {
                                like()
                                loadNext()
                            }}>
                            <FavoriteBorderOutlined />
                        </IconButton>
                    </div>}
                </div>
            </main>
        </ProtectedLogin>
    )
}

export default Tinder