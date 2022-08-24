const tempdao = require("../dao/temp.dao")

const tempService = (fastify) => {
    const dao = tempdao(fastify)
    const getAll = () => dao.getAll()
    
    const save = (title) => dao.save(title)

    return {getAll, save}
}

module.exports = tempService