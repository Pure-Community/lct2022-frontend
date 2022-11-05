

// ко всем запросам в заголовок будет прикрепляться авторизационный токен
// по нему нужно проводить аутентификацию и не выдавать лишнюю инфу где не надо
// тем не менее, нужно выдавать инфу о самом пользователе  
// например, по запросу profile без параметров выдаются данные профиля зарегистрированного пользователя
const URLS = {
    // login
    login: 'auth/login',
    registration: 'auth/registration',
    // profile
    profileInfo: (id?: string) => `profile/info${id ? `?id=${id}` : ''}`,
    profileInfoChange: 'profile/info/change',
    // profileAvatar: 'profile/avatar'
    // idea
    ideas: 'idea/get_all_ideas',
    ideasTinder: 'ideas?tinder=true',
    idea: (id: string) => `idea?id=${id}`,
    ideaDetailed: (id: string) => `idea?id=${id}&full=true`,
    ideaCreate: 'idea/create',
    ideaChange: (id: string) => `idea/change?id=${id}`,
    ideaSave: (id: string) => `idea/save?id=${id}`,
    ideaDelete: (id: string) => `idea/delete?id=${id}`,
    ideaLike: (id: string) => `idea/like?id=${id}`,
    ideaJoinRequest: (id: string) => `idea/join-request?id=${id}`,
    // admin
    ideaApprove: (id: string) => `idea/approve?id=${id}`,
    // comment
    getComment: (postId: string) => `comment?id=${postId}`, // postId - id идеи или другого коммента 
    createComment: (postId: string) => `comment/create?id=${postId}`,
    deleteComment: (id: string) => `comment/delete?id=${id}`, // id комментария
    changeComment: (id: string) => `comment/change?id=${id}`,
    likeComment: (id: string) => `comment/like?id=${id}`,
    photo: (id: string) => `static/photo?file_id=${id}`
}

export default URLS