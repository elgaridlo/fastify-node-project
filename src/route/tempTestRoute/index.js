const route = async (fastify) => {
    // get route
    fastify.get('/', async (request, reply) => {
        
    })
    
    // post route
    fastify.post('/', async (request, reply) => {
        fastify.log.info(`request with body ${request}`)
        const { title } = request.body

        const id = await fastify.db.one(
            'INSERT INTO testTable(title) values($1) RETURNING id',
            [title]
        )

        reply.code(201).send(id)
    })
}

module.exports = route