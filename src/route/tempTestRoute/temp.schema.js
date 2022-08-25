// Schema validasi disini sama dengan typeBox di arta
// Validasi request Schema
const postRequestBody = {
    type: 'object',
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            minLength: 10
        }
    }
}

// dont return array but return object biar bisa ditambahin property lain
const getResponseBody = {
    200: {
        type: 'object',
        required: ['temps'],
        properties: {
            temps: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['title', 'id'],
                    properties: {
                        id: {
                            type: 'string',
                        },
                        title: {
                            type: 'string',
                            minLength: 10
                        }
                    }
                }
            }
        }
    }
}
// Validasi Response Schema
const postReponse = {
    201: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' },
        }
    }
}

module.exports = {
    postRequestBody,
    postReponse,
    getResponseBody
}