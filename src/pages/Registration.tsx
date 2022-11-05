import { Button, TextField } from '@mui/material'
import axios from 'axios'
import URLS from 'constants/urls'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { sendRequest } from 'utils/requests'
import './Registration.scss'

const Registration: FC = () => {
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [sendingData, setSendingData] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const setLoginData = async () => {
        const result = sendRequest('post', URLS.registration, {
            username: login,
            password: password,
            grant_type: 'password'
        })
            .then(res => {
                if (res.requestSuccess) navigate('/ideas')
                else console.log('error');
            })
    }

    return (
        <main className='page-registration'>
            <div className='page-registration__content'>
                <h1 className='page-registration__title'>Создайте аккаунт или войдите через соцсети</h1>
                <div className="page-registration__form">
                    <TextField className='page-registration__input' variant="standard" label='Логин' value={login} onChange={(e) => setLogin(e.target.value)} />
                    <TextField className='page-registration__input' variant="standard" label='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    <TextField className='page-registration__input' variant="standard" label='Повторите пароль' error={!!password2 && password !== password2} value={password2} onChange={(e) => setPassword2(e.target.value)} type='password' />
                    <div className="page-registration__buttons">
                        <Button variant='outlined' onClick={() => navigate('/login')}>
                            Назад
                        </Button>
                        <Button variant='contained' disabled={!login || !password || password !== password2} onClick={setLoginData}>
                            Зарегистрироваться
                        </Button>
                    </div>
                    <div className="page-registration__bottom-bar">
                        <p className='page-registration__alt-text'>
                            войдите через
                            <button className='page-registration__alt-button'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                    <path d="M3.15308 7.3455L6.43858 9.755C7.32758 7.554 9.48058 6 12.0001 6C13.5296 6 14.9211 6.577 15.9806 7.5195L18.8091 4.691C17.0231 3.0265 14.6341 2 12.0001 2C8.15908 2 4.82808 4.1685 3.15308 7.3455Z" fill="#FF3D00" />
                                    <path d="M11.9999 22C14.5829 22 16.9299 21.0115 18.7044 19.404L15.6094 16.785C14.6054 17.5455 13.3574 18 11.9999 18C9.39891 18 7.19041 16.3415 6.35841 14.027L3.09741 16.5395C4.75241 19.778 8.11341 22 11.9999 22Z" fill="#4CAF50" />
                                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855C15.6085 16.785 15.609 16.785 15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                                </svg>
                            </button>
                            <button className='page-registration__alt-button'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 19.875C21 20.4956 20.4956 21 19.875 21H4.12499C3.50451 21 3 20.4956 3 19.875V4.12499C3 3.50447 3.50451 3 4.12499 3H19.875C20.4956 3 21 3.50447 21 4.12499V19.875Z" fill="#ED1F24" />
                                    <path d="M14.0311 6.67688H12.418C10.833 6.67688 9.48886 7.88336 9.48886 10.2257C9.48886 11.6309 10.1398 12.6669 11.2999 13.178L9.13506 17.0958C9.06421 17.2237 9.13506 17.3229 9.24821 17.3229H10.253C10.3378 17.3229 10.3947 17.2946 10.4229 17.2237L12.3898 13.3768H13.0972V17.2237C13.0972 17.266 13.1395 17.3229 13.1961 17.3229H14.0736C14.1584 17.3229 14.1868 17.2803 14.1868 17.2096V6.81883C14.1868 6.71946 14.1302 6.67688 14.0311 6.67688ZM13.0972 12.4684H12.5029C11.569 12.4684 10.6635 11.7871 10.6635 10.0838C10.6635 8.30914 11.5124 7.58526 12.3755 7.58526H13.0972V12.4684H13.0972Z" fill="white" />
                                </svg>
                            </button>
                            <button className='page-registration__alt-button'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 18.5C21 19.881 19.881 21 18.5 21H5.5C4.1195 21 3 19.881 3 18.5V5.5C3 4.119 4.1195 3 5.5 3H18.5C19.881 3 21 4.119 21 5.5V18.5Z" fill="#1976D2" />
                                    <path d="M17.9685 9.0205C17.9915 8.945 18.0025 8.875 17.9995 8.8125C17.992 8.6315 17.8675 8.5 17.5745 8.5H16.2655C15.935 8.5 15.7825 8.7 15.6935 8.9005C15.6935 8.9005 14.8775 10.58 13.937 11.6875C13.632 12.008 13.477 12 13.312 12C13.2235 12 13 11.893 13 11.5995V9.007C13 8.66 12.9135 8.5 12.634 8.5H10.3095C10.106 8.5 10 8.66 10 8.8205C10 9.154 10.449 9.234 10.5 10.1685V11.98C10.5 12.42 10.4235 12.5 10.2585 12.5C9.8135 12.5 8.9375 11 8.351 9.034C8.224 8.647 8.097 8.5 7.7665 8.5H6.445C6.0635 8.5 6 8.687 6 8.887C6 9.2475 6.3 11.1965 7.9375 13.4375C9.125 15.0625 10.6895 16 12.0745 16C12.9135 16 12.9995 15.7865 12.9995 15.453V13.967C13 13.5665 13.0915 13.5 13.3585 13.5C13.549 13.5 13.9375 13.625 14.6875 14.5C15.5525 15.509 15.7095 16 16.2055 16H17.5145C17.8185 16 17.993 15.8725 18 15.625C18.0015 15.562 17.9925 15.4915 17.972 15.413C17.875 15.125 17.43 14.421 16.875 13.75C16.5675 13.3785 16.264 13.0105 16.1245 12.8105C16.031 12.68 15.9955 12.588 16 12.5C16.0045 12.4075 16.0525 12.3195 16.1245 12.1965C16.1115 12.1965 17.8035 9.821 17.9685 9.0205Z" fill="white" />
                                </svg>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Registration