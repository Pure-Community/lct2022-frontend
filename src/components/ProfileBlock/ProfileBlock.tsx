import { ShortUser } from 'interfaces/IUser'
import React, { FC, useState } from 'react'
import './ProfileBlock.scss'
import { PersonOutlineOutlined, KeyboardArrowDown, InsertDriveFileOutlined, BookmarkBorderOutlined, LogoutOutlined, KeyboardArrowUp } from "@mui/icons-material";
import { API } from 'utils/requests';
import URLS from 'constants/urls';
import { profile } from 'console';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const ProfileBlock: FC<ShortUser> = ({ avatar_id, id, login, name }) => {
  const [actionsOpened, setactionsOpened] = useState(false)
  const navigate = useNavigate()
  const actions = [
    { id: 1, link: '/profile', name: 'Профиль', icon: <PersonOutlineOutlined /> },
    { id: 2, link: '/profile/ideas', name: 'Мои идеи', icon: <InsertDriveFileOutlined /> },
    { id: 3, link: '/profile/ideas', name: 'Сохраненные', icon: <BookmarkBorderOutlined /> },
    { id: 4, link: '/logout', name: 'Выйти', color: 'red', icon: <LogoutOutlined /> },
  ]

  return (
    <div className='profile-block' onClick={() => setactionsOpened(!actionsOpened)}>
      {avatar_id ? <img className='profile-block__avatar' src={`${API}${URLS.photo(avatar_id)}`} width={54} alt='avatar' /> : <PersonOutlineOutlined />}
      <p className='profile-block__name'>{login}</p>
      {actionsOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      {actionsOpened && <div className="profile-block__actions">
        {actions.map(({ icon, id, link, name, color }) => <div
          className={`profile-block__action ${color && `profile-block__action_${color}`}`}
          onClick={() => navigate(link)}
          key={id}
        >
          {icon}
          <p className="profile-block__action-name">{name}</p>
        </div>)}
      </div>}
    </div>
  )
}

export default ProfileBlock