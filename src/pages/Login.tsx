import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import URLS from 'constants/urls'
import AppStoreContext from 'context/AppStoreContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from 'utils/requests'
import './Login.scss'

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const appStore = useContext(AppStoreContext)

    const setLoginData = async () => {
        const result = sendRequest('post', URLS.login, {
            username: login,
            password: password,
            grant_type: 'password'
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(res => {
                if (res.error) {

                } else {
                    appStore.setId(res.user_id)
                    appStore.setToken(res.access_token)
                    navigate('/')
                }

            })
            .catch(console.log)
    }

    return (
        <main className='page-login'>
            <div className='page-login__content'>
                <h1 className='page-login__title'>Добро пожаловать в GreatIdea!</h1>
                <div className="page-login__form">
                    <TextField label="Логин" variant="standard" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <TextField label="Пароль" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    <div className="page-login__buttons">
                        <Button variant='outlined' onClick={() => navigate('/registration')}>
                            Регистрация
                        </Button>
                        <Button variant='contained' disabled={!login || !password} onClick={setLoginData}>
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login