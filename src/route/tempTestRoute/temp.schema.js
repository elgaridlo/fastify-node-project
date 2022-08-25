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
    postReponse
}