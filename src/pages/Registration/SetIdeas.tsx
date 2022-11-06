import { Button } from '@mui/material'
import URLS from 'constants/urls'
import { IBubble } from 'interfaces'
import { RegistrationStepProps } from 'pages/Registration'
import React, { useRef, useEffect, useState, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import createEngine from 'utils/matter'
import { sendRequest } from 'utils/requests'
import '../Preferences.scss'

class Balls {
    balls: IBubble[] = []
    constructor(initial: IBubble[]) {
        this.balls = initial
    }

    public updateBall(id: number, action: 'up' | 'down') {
        this.balls = this.balls.map(b => {
            if (b.id !== id) return b
            let newWeight = action === 'up' ? b.weight + 1 : 1
            return {
                circle_id: b.circle_id,
                id: b.id,
                name: b.name,
                weight: newWeight
            }
        })
        console.log(this.balls)
    }

    public getResult() {
        return this.balls.filter(b => b.weight > 1).map(b => ({
            id: b.id,
            weight: b.weight - 1
        }))
    }
}

const PreferencesIdeas: FC<RegistrationStepProps> = ({ next, prev }) => {
    const canvas = useRef(null)
    const [engineCreated, setengineCreated] = useState(false)
    const [balls, setballs] = useState<Balls>()
    const navigate = useNavigate()

    const handleClick = () => {
        sendRequest('post', URLS.saveSkills, balls?.getResult() ?? [])
            .then(res => {
                if (res.error) {

                } else next()
            })
    }

    useEffect(() => {
        if (!engineCreated)
            sendRequest('get', URLS.skillsIdeas)
                .then(res => {
                    let mapped = res.map((b: IBubble) => ({ ...b, weight: 1 }))
                    setballs(new Balls(mapped))
                })
    }, [])

    useEffect(() => {
        if (!engineCreated && balls && balls.balls.length > 0) {
            createEngine(balls.balls, (id, action) => balls.updateBall(id, action))
            setengineCreated(true)
        }
    }, [balls])

    return (
        <div className='page-preferences'>
            <div className='page-preferences__content'>
                <h1 className='page-preferences__title'>
                    Выберите темы, которые вас интересуют.
                    Это поможет нам подобрать наиболее подходящие идеи для вас
                </h1>
                <div ref={canvas} id='matter-container' />
                <div className="page-preferences__buttons">
                    <Button variant='outlined' onClick={() => prev()}>
                        Пропустить
                    </Button>
                    <Button variant='contained' onClick={handleClick}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PreferencesIdeas