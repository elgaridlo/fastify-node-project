const UserRepository = require('../dao/user.dao')

const userService = (fastify) => {
    // Jangan tulis command, buatlah kodemu lebih mudah dipahami dan itu lah clean code
    // get user Id
    const userRepository = UserRepository(fastify)
    const getUserById = (userId) => {

    }

    // save user to db and return id
    const createUser = async (user) => {
        const userId = await userRepository.saveUser(user)
        return userId
    }
    return { getUserById, createUser}
}

module.exports = userService