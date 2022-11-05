interface IUser {
  id: number
  login: string
  is_admin: boolean
  avatar_id: string
  name: string
  birth: string
  contacts: {
    type: string
    url: string
  }[]
// [{
//      type: 'github',
//      url: 'github.com/suck-my-dick'   
// },
// {    
//      type: 'phone',
//      url: '89020000000' 
// }]
}

type ShortUser = Pick<IUser, 'id' | 'login' | 'avatar_id' | 'name'>

export default IUser
export type {ShortUser}