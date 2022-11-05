import { ShortUser } from "./IUser"

interface IIdea {
    id: number
    title: string
    description?: string
    author_id: number
    likes_count: number
    comments_count: number
    logo_id?: string
    photo_ids?: string[]
    video_id?: string
    approved: false
    author: ShortUser,
    members: ShortUser[]
}

type IIdeaCard = Pick<IIdea,
    'id' |
    'title' |
    'description' |
    'likes_count' |
    'comments_count' |
    'approved' |
    'author' |
    'photo_ids'
>

export default IIdea
export type { IIdeaCard }