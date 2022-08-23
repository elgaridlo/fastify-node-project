// ini digunakan untuk memvalidasi error yang tidak jelas di plugin/database.js
const loadEnvironmentVariable = (envName) => {
    if(process.env[envName]) {
        return process.env[envName]
    }

    throw new Error(`${envName} env does not exist`)
}
module.exports = {
    database_uri: loadEnvironmentVariable(
        'POSTGRES_URI'
    )
}