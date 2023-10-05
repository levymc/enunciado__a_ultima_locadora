import { User } from "@prisma/client"
import { faker } from '@faker-js/faker';

export function generateUserMocks(): User {
    return {
        id: faker.number.int(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        cpf: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
        birthDate: faker.date.birthdate({ min: 5, max: 15, mode: 'age' })
    };
}