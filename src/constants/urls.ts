

// ко всем запросам в заголовок будет прикрепляться авторизационный токен
// по нему нужно проводить аутентификацию и не выдавать лишнюю инфу где не надо
// тем не менее, нужно выдавать инфу о самом пользователе  
// например, по запросу profile без параметров выдаются данные профиля зарегистрированного пользователя
const URLS = {
    // login
    login: 'auth/login',
    registration: 'auth/registration',
    skills: 'utils/get_skills',
    saveSkills: 'user/edit_skills',
    skillsIdeas: 'utils/get_idea_tags',
    // profile
    profileInfo: (id: string) => `user/get_user_by_id?user_id=${id}`,
    profileInfoChange: 'profile/info/change',
    profileIdeas: 'idea/get_my_ideas',
    getSkills: 'user/get_my_skills',
    likedIdeas: 'user/liked_ideas',
    // profileAvatar: 'profile/avatar'
    // idea
    ideas: 'idea/get_all_ideas',
    ideasTinder: 'ideas?tinder=true',
    idea: (id: string) => `idea/get_idea_by_id?id=${id}`,
    ideaDetailed: (id: string) => `idea?id=${id}&full=true`,
    ideaCreate: 'idea/create',
    ideaChange: (id: number) => `idea/change?id=${id}`,
    ideaSave: (id: number) => `idea/save?id=${id}`,
    ideaDelete: (id: number) => `idea/delete?id=${id}`,
    ideaLike: (id: number) => `idea/like?id=${id}`,
    ideaDislike: (id: number) => `idea/dislike?id=${id}`,
    ideaJoinRequest: (id: number) => `idea/request_membership?id=${id}`,
    // admin
    ideaApprove: (id: string) => `idea/approve?id=${id}`,
    // comment
    getComment: (postId: string) => `comment?id=${postId}`, // postId - id идеи или другого коммента 
    createComment: (postId: string) => `comment/create?id=${postId}`,
    deleteComment: (id: string) => `comment/delete?id=${id}`, // id комментария
    changeComment: (id: string) => `comment/change?id=${id}`,
    likeComment: (id: string) => `comment/like?id=${id}`,
    // tinder
    getNext: 'idea/get_unwatched_idea',
    // media
    photo: (id: string) => `static/photo?file_id=${id}`,
    video: (id: string) => `static/video?file_id=${id}`,

}

export default URLS