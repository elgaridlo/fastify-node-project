const tempService = require('../../service/temp.service')
const {postRequestBody, postReponse, getResponseBody} = require('./temp.schema')

const route = async (fastify) => {
    const {getAll, save} = tempService(fastify)

    // get route
    fastify.get('/', { schema: { response: getResponseBody } } , async (request, reply) => {
        const allTest = await getAll()

        reply.code(200).send({temps: allTest})
    })
    
    // post route
    fastify.post('/', { schema: {body: postRequestBody, response: postReponse}} ,async (request, reply) => {
        fastify.log.info(`request with body ${request}`)
        const { title } = request.body

        const id = await save(title)

        reply.code(201).send(id)
    })
}

module.exports = route