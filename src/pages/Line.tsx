import { IdeaCard, Search } from 'components'
import React, { useState, useEffect } from 'react'
import './Line.scss'
import IIdea, { IIdeaCard } from "interfaces/IIdea";
import { sendRequest } from 'utils/requests';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';

function Line() {
    const [cards, setCards] = useState<IIdeaCard[]>([])

    useEffect(() => {
        sendRequest('get', URLS.ideas)
            .then(res => setCards(res))
    }, [])


    return (
        <div className='page-line'>
            <Search />
            <div className="page-line__cards">
                {cards.map((ideaCard) => <IdeaCard key={ideaCard.id} {...ideaCard} />)}
            </div>
        </div>
    )
}

export default Line