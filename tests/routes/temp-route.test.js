const build = require('../../src/app')

let app
describe('temp route', () => {
    beforeAll(async () => {
        app = await build()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should return id when post route called with valid data', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/v1/test/',
            payload: {
                title: 'Some test check'
            }
        })

        expect(res.statusCode).toEqual(201)
        expect(res.json().id).toBeDefined()
    })

    it('should get data from the route', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/api/v1/test/'
        })
        expect(res.statusCode).toEqual(200)
        // expect(res.json().length > 0).toBe(true)
    })
})