const Fastify = require('fastify')
const UserService = require('../../src/service/user.service')
const UserRepository = require('../../src/dao/user.dao')

const getUserByIdDao = jest.fn()
const saveUser = jest.fn()

jest.mock('../../src/dao/user.dao')

describe('user service', () => {
    beforeAll(() => {
        UserRepository.mockImplementation(() => ({
            getUserById: getUserByIdDao,
            saveUser
        }))
    })
    it('should save user when user data is valid', async () => {
        const { createUser } = UserService({})
        saveUser.mockReturnValueOnce('user_uuid')
        const user = {
            firstName: 'Peter',
            lastName: 'Smith',
            password: 'password',
            email: 'email'        
        }
        const userId = await createUser(user)
        expect(userId).toEqual('user_uuid')
        expect(saveUser).toHaveBeenCalledWith(user)
    })

    it('should return user when userId exist', async() => {
        const {getUserById} = UserService({})
        getUserByIdDao.mockReturnValueOnce({
            id: 'uuid',
            firstName: 'peter',
            middleName: 'middlename',
            lastName: 'smith',
            password: 'password',
            email: 'email'
        })


        const user = await getUserById('user_uuid')

        expect(user).toEqual({
            id: 'uuid',
            username: 'peter middlename smith',
            email: 'email'
        })
    })

    it('should return user with correct when user exist', async() => {
        const {getUserById} = UserService({})
        getUserByIdDao.mockReturnValueOnce({
            id: 'uuid',
            firstName: 'peter',
            password: 'password',
            email: 'email'
        })


        const user = await getUserById('user_uuid')

        expect(user).toEqual({
            id: 'uuid',
            username: 'peter',
            email: 'email'
        })
    })
})