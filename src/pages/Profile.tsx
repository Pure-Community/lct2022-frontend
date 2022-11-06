import { Button, Chip, Typography } from '@mui/material'
import { IdeaCard, Wallpaper } from 'components'
import ProtectedLogin from 'components/ProtectedLogin/ProtectedLogin'
import URLS from 'constants/urls'
import AppStoreContext from 'context/AppStoreContext'
import useAuthorization from 'hooks/useAuthorization'
import IIdea from 'interfaces/IIdea'
import IUser from 'interfaces/IUser'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from 'utils/requests'
import './Profile.scss'

const Profile = () => {
    const [user, setUser] = useState<IUser>()
    const [createdIdeas, setcreatedIdeas] = useState<IIdea[]>([])
    const [likedIdeas, setlikedIdeas] = useState<IIdea[]>([])
    const [skills, setSkills] = useState<any[]>([])
    const appStore = useContext(AppStoreContext)
    useAuthorization(appStore.authToken)
    const navigate = useNavigate()

    useEffect(() => {
        if (appStore.id) {
            sendRequest('get', URLS.profileInfo(appStore.id))
                .then(res => {
                    if (!res.error) {
                        setUser(res)
                    }
                })
        }
    }, [])

    useEffect(() => {
        sendRequest('get', URLS.profileIdeas)
            .then(res => {
                if (!res.error) {
                    setcreatedIdeas(res)
                }
            })
    }, [user])

    useEffect(() => {
        sendRequest('get', URLS.likedIdeas)
            .then(res => {
                if (!res.error) {
                    setlikedIdeas(res)
                }
            })
    }, [user])

    useEffect(() => {
        sendRequest('get', URLS.getSkills)
            .then(res => {
                if (!res.error) {
                    setSkills(res)
                }
            })
    }, [user])

    return (
        <ProtectedLogin>
            <Wallpaper className='page-profile__wall' url={user?.avatar_id ?? ''}>
                <h1 className='page-profile__name'>{user?.name ?? user?.login}</h1>
                <div className="page-profile__skills">
                    {skills.map(s => <Chip key={s.id}>{s.user_id}</Chip>)}
                </div>
            </Wallpaper>
            <div className='page-profile'>
                <div className='page-profile__block'>
                    <h1 className='page-profile__block-title'>Мои идеи</h1>
                    {createdIdeas.length > 0 ? <div className='page-profile__block-elements'>

                        {createdIdeas.map(i => <IdeaCard key={i.id} {...i} />)}
                    </div> : <><p className='page-profile__subtitle'>Пока нет идей</p>
                        <Button variant='outlined' onClick={() => navigate('/idea/create')}>
                            Создать
                        </Button>
                    </>}
                </div>
                <div className='page-profile__block'>
                    <h1 className='page-profile__block-title'>Мне понравилось</h1>
                    {likedIdeas.length > 0
                        ? <div className='page-profile__block-elements'>
                            {likedIdeas.map(i => <IdeaCard key={i.id} {...i} />)}
                        </div> : <><p className='page-profile__subtitle'>Вы пока не ставили лайки на идеи</p>
                            <Button onClick={() => navigate('/tinder')} variant='outlined'>
                                Искать идеи
                            </Button>
                        </>}
                </div>
            </div>
        </ProtectedLogin>
    )
}

export default Profile