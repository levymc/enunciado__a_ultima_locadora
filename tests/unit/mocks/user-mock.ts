import { User } from "@prisma/client"

export const userMock: User = {
    id: 1,
    firstName: 'Pedro',
    lastName: 'Oriani',
    email: 'a@a.com',
    cpf: '111111111',
    birthDate: new Date('03/10/2010'),
}