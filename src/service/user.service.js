const UserRepository = require('../dao/user.dao')

const userService = (fastify) => {
    // Jangan tulis command, buatlah kodemu lebih mudah dipahami dan itu lah clean code
    // get user Id
    const userRepository = UserRepository(fastify)
    const getUserById = async (userId) => {
        const user = await userRepository.getUserById(userId)
        const username = [user.firstName, user.middleName, user.lastName]
        .filter(name => name !== '')
        .filter(name => name != null)
        .filter(name => name !== undefined)
        .join(' ')
        return {
            id: user.id,
            username,
            email: user.email
        }
    }

    // save user to db and return id
    const createUser = async (user) => {
        const userId = await userRepository.saveUser(user)
        return userId
    }
    return { getUserById, createUser}
}

module.exports = userService