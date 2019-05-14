import axios from 'axios';
const url = 'https://nc-news-andrewr.herokuapp.com/api';

export const getArticles = query => {
  return axios.get(`${url}/articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export const getUser = username => {
  return axios.get(`${url}/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    })
}

export const getTopics = query => {
  return axios.get(`${url}/topics`, { params: query })
    .then(({ data: { topics } }) => {
      return topics;
    });
}

export const getComments = query => {
  return axios.get(`${url}/comments`, { params: query })
    .then(({ data: { comments } }) => {
      return comments;
    })
}