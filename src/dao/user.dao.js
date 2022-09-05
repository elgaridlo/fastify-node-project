const userRepository = (db) => {
    // Get User By ID 
    const getUserById = async(userId) => {
        try {
            return await db.one('select * from users where id = $1', [userId])
        } catch (error) {
            throw Error(`${userId} does not exist!`)
        }
    }
    const saveUser = async(user) => {
        try {
            const {id} = await db.one('INSERT INTO users(first_name, middle_name, last_name, password, email) values($1, $2, $3, $4,$5) RETURNING id',
            [user.firstName, user.middleName, user.lastName, user.password, user.email]
            )
            return id
        } catch (error) {
            throw Error('Not valid user data')
        }
    }

    return {getUserById, saveUser}
}

module.exports = userRepository