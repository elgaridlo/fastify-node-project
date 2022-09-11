const Fastify = require('fastify')

const userRoute = require('../../src/route/user')
const UserService = require('../../src/service/user.service')

jest.mock('../../src/service/user.service')

const createUser = jest.fn()
const getUserById = jest.fn()

UserService.mockImplementation(() =>  ({
        getUserById,
        createUser
    })
)

let app;

describe('user route', () => {
    beforeAll(async() => {
        app = Fastify()
        app.register(userRoute, {prefix: 'api/v1/users'})

        await app.ready()
    })

    it('should return 201 when called with valid user data', async() =>{
        createUser.mockImplementation(() => 'uuid')

        const res = await app.inject({
            method: 'POST',
            url: 'api/v1/users',
            payload: {
                firstName: 'peter',
                password: 'password',
                email: 'email@gmail.com'
            }
        })
        
        expect(res.statusCode).toBe(201)
        expect(res.json().userId).toEqual('uuid')

    })

    // it('should return 404 when called invalid user data', async() =>{
    //     createUser.mockImplementation(() => 'uuid')

    //     const res = await app.inject({
    //         method: 'POST',
    //         url: 'api/v1/users',
    //         payload: {
    //             firstName: 'peter',
    //             password: 'password',
    //             email: 'email@gmail.com'
    //         }
    //     })

    //     expect(res.statusCode).toBe(404)
    //     expect(res.json().userId).toEqual('uuid')

    // })

    it('should return 400 when user service throw error', async() =>{
        createUser.mockImplementation(() => {
            throw Error('invalid data')
        })

        const res = await app.inject({
            method: 'POST',
            url: 'api/v1/users',
            payload: {
                firstName: 'peter',
                password: 'password',
                email: 'email@gmail.com'
            }
        })

        expect(res.statusCode).toBe(400)
        expect(res.json().message).toEqual('invalid data')

    })

    it('should return 400 when email is not correct format', async() =>{
        createUser.mockImplementation(() => 'uuid')

        const res = await app.inject({
            method: 'POST',
            url: 'api/v1/users',
            payload: {
                firstName: 'peter',
                password: 'password',
                email: 'email'
            }
        })

        expect(res.statusCode).toBe(400)
    })
    it('should return 400 when password and firstname is not present', async() =>{
        createUser.mockImplementation(() => 'uuid')

        const res = await app.inject({
            method: 'POST',
            url: 'api/v1/users',
            payload: {
                email: 'email@gmail.com'
            }
        })

        expect(res.statusCode).toBe(400)
    })

    it('should return 200 when user exist', async() =>{
       getUserById.mockImplementation(() => ({
        id: '5b101c75-33d6-472e-b6e0-ea4bcddf402b',
        username: 'peter',
        email: 'email@gmail.com',
        createdAt: '08/09/2020',
        updatedAt: '08/09/2021',
        version: 'ccd4b196-813d-4dc2-9df0-7fa6c4825e74'
       }))
        const res = await app.inject({
            method: 'GET',
            url: 'api/v1/users/5b101c75-33d6-472e-b6e0-ea4bcddf402b',
            payload: {
                email: 'email@gmail.com'
            }
        })

        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({
            id: '5b101c75-33d6-472e-b6e0-ea4bcddf402b',
            username: 'peter',
            email: 'email@gmail.com',
            createdAt: '08/09/2020',
            updatedAt: '08/09/2021',
            version: 'ccd4b196-813d-4dc2-9df0-7fa6c4825e74'
        })
    })

    it('should return 400 when userid not valid', async() =>{
        getUserById.mockImplementation(() => ({
         id: '5b101c75-33d6-472e-b6e0-ea4bcddf402b',
         username: 'peter',
         email: 'email@gmail.com',
         createdAt: '08/09/2020',
         updatedAt: '08/09/2021',
         version: 'ccd4b196-813d-4dc2-9df0-7fa6c4825e74'
        }))
         const res = await app.inject({
             method: 'GET',
             url: 'api/v1/users/somevaliduuid',
             payload: {
                 email: 'email@gmail.com'
             }
         })
 
         expect(res.statusCode).toBe(400)
     })
})