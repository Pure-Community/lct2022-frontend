import { useMatterEngine } from 'hooks'
import React, { useRef, useEffect } from 'react'

const Preferences = () => {
    const canvas = useRef(null)
    const engine = useMatterEngine(
        [{ label: 'python' }, { label: 'django' }, { label: '25k' }],
        console.log
    )

    useEffect(() => {

    }, [])


    return (
        <div className='page-preferences'>
            <h2>
                Выберите темы, которые вас интересуют.
                Это поможет нам подобрать наиболее подходящие идеи для вас
            </h2>
            <div ref={canvas} id='matter-container' />
        </div>
    )
}

export default Preferences