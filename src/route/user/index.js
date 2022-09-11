const UserService = require('../../service/user.service')

const userRoute = async(fastify) => {
     const { getUserById, createUser } = UserService(fastify)

     fastify.get('/:userId', async(request, reply) => {
        
     })

     fastify.post('/', async(request, reply) => {
        fastify.log.info('creating user')

        try {
            const userId = await createUser(request.body)
            fastify.log.info(`user created with ${userId}`)
            reply.code(201).send({userId})
        } catch (error) {
            reply.code(400).send(error )
        }
     })
}

module.exports = userRoute
