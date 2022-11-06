import { IdeaCard, Search } from 'components'
import React, { useState, useEffect } from 'react'
import './Line.scss'
import IIdea, { IIdeaCard } from "interfaces/IIdea";
import { sendRequest } from 'utils/requests';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';

function Line() {
    const [cards, setCards] = useState<IIdeaCard[]>([])
    const [initialCards, setinitialCards] = useState<IIdeaCard[]>([])
    const [search, setsearch] = useState('')

    useEffect(() => {
        sendRequest('get', URLS.ideas)
            .then(res => {
                setCards(res)
                setinitialCards(res)
            })
    }, [])

    useEffect(() => {
        if (search === '') {
            setCards(initialCards)
        } else {
            setCards(cards.filter(card => card.title.includes(search) || card.description?.includes(search)))
        }
    }, [search])

    return (
        <div className='page-line'>
            <Search value={search} onChange={(value) => setsearch(value)} />
            <div className="page-line__cards">
                {cards.map((ideaCard) => <IdeaCard key={ideaCard.id} {...ideaCard} />)}
            </div>
        </div>
    )
}

export default Line