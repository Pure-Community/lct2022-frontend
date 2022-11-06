import { Button, TextField } from '@mui/material'
import { FileUploadSharp } from '@mui/icons-material'
import React, { useState } from 'react'
import './IdeaCreate.scss'
import URLS from 'constants/urls'
import { API } from 'utils/requests'

const IdeaCreate = () => {
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')

    return (
        <main className='page-create'>
            <div className='page-create__content'>
                <h1 className='page-create__title'>Поделитесь с сообществом вашей идеей!</h1>
                <form
                    className="page-create__form"
                    method="post"
                    action={`${API}${URLS.ideaCreate}`}
                    onSubmit={(e) => {
                        console.log(e)
                    }}
                >
                    <TextField label="Название идеи" variant="standard" value={name} onChange={(e) => setname(e.target.value)} />
                    <TextField label="Описание идеи" variant="standard" value={description} onChange={(e) => setdescription(e.target.value)} />
                    <label className='page-create__link' htmlFor='photos'>Прикрепите фотографии к идее <input type='file' id='photos' multiple /></label>
                    <label className='page-create__link' htmlFor='video'>или даже загрузите видео <input type='file' id='video' multiple /></label>
                    <div className="page-create__buttons">
                        <Button variant='contained' type='submit'>
                            Создать
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default IdeaCreate