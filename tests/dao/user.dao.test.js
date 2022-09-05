const Fastify = require('fastify')
const userRepository = require('../../src/dao/user.dao')
const dbPlugin = require('../../src/plugin/database')


let app;
describe('User Repository', () => {
    beforeEach(async() => {
        app = Fastify()
        app.register(dbPlugin)
        await app.ready()
    })

    it('should save user id', async() => {
        const user = {
            firstName: 'Peter',
            lastName: 'Smith',
            password: 'password',
            email: 'email'
        }

        const {saveUser} = userRepository(app.db)
        const userId = await saveUser(user)
        expect(userId).toBeDefined()
    })

    it('should throw error when required field is not present', async() => {
        const user = {
            firstName: 'Peter',
            lastName: 'Smith',
            email: 'email'
        }

        const {saveUser} = userRepository(app.db)
        await expect(saveUser(user)
        ).rejects.toThrow(Error('Not valid user data'))
    })

    it('should return user id when userId is exist in db', async() => {
        const user = {
            firstName: 'Peter',
            lastName: 'Smith',
            password: 'password',
            email: 'email'
        }

        const {saveUser, getUserById} = userRepository(app.db)
        const userId = await saveUser(user)

        const dbuser = await getUserById(userId)
        expect(dbuser.first_name).toEqual('Peter')
    })

    it('should throw exception when user doesnot exist', async() => {
        const {getUserById} = userRepository(app.db)

        await expect(getUserById('some uuid')).rejects.toThrow('some uuid does not exist!')
    })
})