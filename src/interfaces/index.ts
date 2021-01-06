export interface ILsChatUser {
    id: number
    name: string
    photo?: string
}

export interface ILsChatMessage {
    id: number
    text: string
    user: ILsChatUser
}
