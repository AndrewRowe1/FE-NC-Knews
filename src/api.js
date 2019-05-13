import Axios from 'axios';
const url = 'https://nc-news-andrewr.herokuapp.com/api';
// {queryKEy: queryValue};
export const getArticles = (query) => {
  return Axios.get(`${url}/articles`, { params: { query } })
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export const getUser = username => {
  return Axios.get(`${url}/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    })
}