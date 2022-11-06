import { Button, TextField } from '@mui/material'
import axios from 'axios'
import URLS from 'constants/urls'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendRequest } from 'utils/requests'
import './Registration.scss'
import CreateAcccount from './Registration/CreateAcccount'
import './Preferences.scss'
import Preferences from './Registration/SetSkills'
import PreferencesIdeas from './Registration/SetIdeas'

enum RegistrationSteps {
    createAccount,
    setSkills,
    setIdeas
}

interface RegistrationStepProps {
    next: () => void
    prev: () => void
}

const Registration: FC = () => {
    const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.createAccount)
    const navigate = useNavigate()
    const location = useLocation()

    const resolve = () => {
        switch (step) {
            case RegistrationSteps.createAccount:
                return <CreateAcccount next={() => setStep(RegistrationSteps.setSkills)} prev={() => navigate('/login')} />
            case RegistrationSteps.setSkills:
                return <Preferences next={() => setStep(RegistrationSteps.setIdeas)} prev={() => setStep(RegistrationSteps.setIdeas)} />
            case RegistrationSteps.setIdeas:
                return <PreferencesIdeas next={() => navigate('/')} prev={() => navigate('/')} />
        }
    }

    return (resolve())

}

export default Registration
export type { RegistrationStepProps }