import URLS from 'constants/urls';
import { IIdeaCard } from 'interfaces/IIdea'
import React, { FC } from 'react'
import { API } from 'utils/requests';
import './IdeaCard.scss';

const IdeaCard: FC<IIdeaCard> = ({ photo_ids, approved, author, comments_count, id, likes_count, title, description }) => {
    console.log(photo_ids);
    const bgStyle = photo_ids && photo_ids[0]
        ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 69.58%), url(${API}${URLS.photo(photo_ids[0])})`
        : `linear-gradient(180deg, rgba(206, 68, 255, 0.4275) 0%, rgba(139, 63, 192, 0.536126) 23.44%, rgba(94, 60, 150, 0.608544) 39.06%, rgba(36, 55, 95, 0.702687) 59.37%, rgba(6, 53, 68, 0.75) 69.58%)`

    return (
        <div className='idea-card' style={{ background: bgStyle, backgroundSize: 'contain' }}>
            <h3 className='idea-card__title'>{title}</h3>
            <div className="idea-card__bottom">
                <p className="idea-card__description">{description}</p>
                <p className='idea-card__likes-count'>
                </p>
            </div>
        </div>
    )
}

// background: linear - gradient(180deg, rgba(0, 0, 0, 0) 0 %, rgba(0, 0, 0, 0.75) 69.58 %), url(.jpg);


export default IdeaCard