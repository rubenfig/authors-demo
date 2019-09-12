
const initialState = {
    authors: [
        {
            "id": "138a71b0-d269-11e9-b500-1d02fa422f1d",
            "birthdate": 1528461936,
            "email": "asdasd@asdasd.com",
            "fullname": "Ruben3"
        },
        {
            "id": "0d3ea880-d269-11e9-b500-1d02fa422f1d",
            "birthdate": 1559997936,
            "email": "asdasd@asdasd.com",
            "fullname": "Ruben2"
        },
        {
            "id": "fa4ca6f0-d268-11e9-b500-1d02fa422f1d",
            "birthdate": 1567968336,
            "email": "asdasd@asdasd.com",
            "fullname": "Ruben"
        }
    ],
    publications: [],
    loading: false,
    error: null
};

export default (state = initialState, action)=>{
    switch (action.type) {
        case 'GET_AUTHORS_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_AUTHORS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                authors: action.payload
            };
        case 'GET_AUTHORS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case 'GET_PUBLICATIONS_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_PUBLICATIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                publications: action.payload.publications,
                lastEvaluated: action.payload.next
            };
        case 'GET_PUBLICATIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
