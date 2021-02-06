import { ILsChatMessage, IHeaderProps, ILsChatUser } from '../interfaces'

export type TLsChatMessageDesign = ILsChatMessage & {
    showDateOnTop: boolean
    showArrow: boolean
}

export type IHeaderWithUserProps = IHeaderProps & { user: ILsChatUser }
