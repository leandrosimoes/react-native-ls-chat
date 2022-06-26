import { faker } from '@faker-js/faker'

import { asyncForEach } from '../utils'

let START_DATE = new Date(2021, 0, 1)
let END_DATE = new Date()

const generateAvatar = () => {
    const isWoman = faker.datatype.boolean()
    const gender = isWoman ? 'women' : 'men'
    const num = faker.datatype.number({ min: 1, max: 99 })
    return `https://randomuser.me/api/portraits/${gender}/${num}.jpg?v=${new Date().getTime()}`
}

export class User {
    id: string

    name: string

    photo: string

    constructor(_name = '', _photo = '') {
        const avatar = generateAvatar()
        const gender = avatar.indexOf('women') > -1 ? 'female' : 'male'

        this.id = faker.datatype.uuid()
        this.name = _name || faker.name.findName('', '', gender)

        this.photo = _photo || generateAvatar()
    }
}

export class Message {
    id: string

    text: string

    replyingTo: any | null

    time: number

    user: any | null

    isDelivered: boolean

    isRead: boolean

    constructor(_user, _replyingTo, _isDelivered, _isRead) {
        this.id = faker.datatype.uuid()
        this.text = faker.lorem.sentences(faker.datatype.number({ min: 3, max: 5 }))
        this.replyingTo = _replyingTo
        this.time = faker.date.between(START_DATE, END_DATE).getTime()
        this.user = _user
        this.isDelivered = !!_isDelivered
        this.isRead = !!_isRead
    }
}

export const MAIN_USER = new User(
    'Leandro Simões',
    'https://avatars3.githubusercontent.com/u/5066378?s=400&u=98d81da11220a6d0f7f51532e2c3e949b50a445b&v=4'
)

export const getRandomMessages = async (howMany = 1, users: User[] = []) => {
    const messages = []
    messages.length = howMany

    const result: Message[] = []
    await asyncForEach(messages, async () => {
        const notMainUser = users.filter((u) => u.id !== MAIN_USER.id)
        const user = notMainUser[faker.datatype.number({ min: 0, max: notMainUser.length - 1 })]
        result.push(new Message(user, null, true, true))
    })

    return result
}

export const getRandomUsers = async (howMany = 1) => {
    if (!howMany) return []

    const users = []
    users.length = howMany

    const result: User[] = [MAIN_USER]

    await asyncForEach(users, async () => {
        result.push(new User())
    })

    return result
}

export const getPrevRandomMessages = async (users: User[]) => {
    END_DATE = START_DATE
    START_DATE = faker.date.between(
        new Date(START_DATE.setFullYear(START_DATE.getFullYear() - 1)),
        END_DATE
    )

    const howMany = faker.datatype.number({ min: 1, max: 3 })
    return await getRandomMessages(howMany, users)
}
