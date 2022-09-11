const postRequestBody = { 
    type: 'object',
    required: ['firstName', 'password','email'],
    properties: {
        firstName: {
            type: 'string'
        },
        middleName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        password: {
            type: 'string',
            minLength: 8
        },
        email: {
            type: 'string',
            format: 'email'
        },
    }
}

const postResponseBody = {
    201: {
        type: 'object',
        required: ['userId'],
        properties: {
            userId: {
                type: 'string',
                format: 'uuid'
            }
        }
    },
    400: {
        type: 'object',
        required: ['statusCode','error', 'message'],
        properties: {
            statusCode: {
                type: 'number'
            },
            error: {
                type: 'string'
            },
            message: {
                type: 'string'
            }
        }
    }
}

module.exports = {
    postRequestBody,
    postResponseBody
}