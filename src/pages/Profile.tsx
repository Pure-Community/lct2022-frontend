import { ModeEditOutlineOutlined } from '@mui/icons-material'
import { Box, Button, Chip, Fab, Modal, TextField, Typography } from '@mui/material'
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

interface IUserInfo {
    [key: string]: string;
    login: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    telegram: string,
    github: string
}

const Profile = () => {
    const [user, setUser] = useState<IUser>()
    const [createdIdeas, setcreatedIdeas] = useState<IIdea[]>([])
    const [likedIdeas, setlikedIdeas] = useState<IIdea[]>([])
    const [skills, setSkills] = useState<any[]>([])
    const appStore = useContext(AppStoreContext)
    useAuthorization(appStore.authToken)
    const navigate = useNavigate()
    const [settings, setsettings] = useState(false)
    const [userInfo, setUserInfo] = useState<IUserInfo>()

    useEffect(() => {
        if (!settings) {
            if (appStore.id) {
                sendRequest('get', URLS.profileInfo(appStore.id))
                    .then(res => {
                        if (!res.error) {
                            setUser(res)
                            let r = res
                            try {
                                delete r.is_admin
                                delete r.avatar_id
                                delete r.birth
                                delete r.id
                                Object.keys(r).map(k => {
                                    if (!r[k]) {
                                        r[k] = ''
                                    }
                                })
                                setUserInfo(r)
                            } catch {
                                setUserInfo({
                                    login: '',
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    phone: '',
                                    telegram: '',
                                    github: ''
                                })
                            }
                        }
                    })
            }

        }
    }, [settings])

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

    const handleSave = () => {
        sendRequest('post', URLS.profileEdit, { edit_info: { ...userInfo } })
            .then(res => {
                setsettings(false)

            })
    }

    return (
        <ProtectedLogin>
            <Wallpaper className='page-profile__wall' url={user?.avatar_id ?? ''}>
                <h1 className='page-profile__name'>{user?.name ?? user?.login}</h1>
                <div className="page-profile__skills">
                    {skills.map(s => <Chip key={s.id}>{s.user_id}</Chip>)}
                </div>
                <div className='page-profile__edit'>
                    <Fab onClick={() => setsettings(true)}>
                        <ModeEditOutlineOutlined />
                    </Fab>
                </div>
            </Wallpaper>
            <div className='page-profile'>
                <Modal
                    open={settings}
                    onClose={() => setsettings(false)}
                >
                    <div className='profile-settings' >
                        <h1>Редактировать профиль</h1>
                        {userInfo && Object.keys(userInfo).map(k =>
                            <TextField label={k} value={userInfo[k]} onChange={(e) => setUserInfo({ ...userInfo, [k]: e.target.value })} />
                        )}
                        <Button variant='contained' onClick={() => handleSave()}>
                            Сохранить изменения
                        </Button>

                    </div>
                </Modal>
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