const dao = (fastify) => {
    const getAll = () => fastify.db.query('select * from test')

    const save = (title) => fastify.db.one(
        'INSERT INTO test(title) values($1) RETURNING id',
        [title]
    )

    return {getAll, save}
}

module.exports = dao