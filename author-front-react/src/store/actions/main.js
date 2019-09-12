import axios from 'axios';
import {API_URL} from "../config/api";

export const getAuthors = () => {
    return dispatch => {
        dispatch(getAuthorsStarted());

        axios
          .get(`${API_URL}/authors`)
          .then(res => {
              dispatch(getAuthorsSuccess(res.data.authors));
          })
          .catch(err => {
              dispatch(getAuthorsFailure(err.message));
          });
    };
};

const getAuthorsSuccess = authors => {
    return ({
        type: 'GET_AUTHORS_SUCCESS',
        payload: [
            ...authors
        ]
    })
};

const getAuthorsStarted = () => ({
    type: 'GET_AUTHORS_STARTED'
});

const getAuthorsFailure = error => ({
    type: 'GET_AUTHORS_FAILURE',
    payload: {
        error
    }
});


export const getPublications = (params) => {
    return dispatch => {
        dispatch(getPublicationsStarted());
        axios
          .get(`${API_URL}/publications`, {
            params
          })
          .then(res => {
              dispatch(getPublicationsSuccess(res.data));
          })
          .catch(err => {
              dispatch(getPublicationsFailure(err.message));
          });
    };
};

const getPublicationsSuccess = data => ({
    type: 'GET_PUBLICATIONS_SUCCESS',
    payload: {
        ...data
    }
});

const getPublicationsStarted = () => ({
    type: 'GET_PUBLICATIONS_STARTED'
});

const getPublicationsFailure = error => ({
    type: 'GET_PUBLICATIONS_FAILURE',
    payload: {
        error
    }
});
