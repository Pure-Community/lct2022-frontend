import { IIdeaCard } from 'interfaces/IIdea'
import React, { FC } from 'react'

const IdeaCard: FC<IIdeaCard> = ({ approved, author, comments_count, id, likes_count, title, description }) => {
    return (
        <div className='idea-card'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default IdeaCard