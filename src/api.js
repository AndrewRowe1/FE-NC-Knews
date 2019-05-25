import axios from 'axios';
const url = 'https://nc-news-andrewr.herokuapp.com/api';

export const getArticles = query => {
  return axios.get(`${url}/articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((error) => {
      return error.response.data;
    })
}

export const getArticle = id => {
  return axios.get(`${url}/articles/${id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((error) => {
      return error.response.data;
    })
}

export const submitArticle = body => {
  return axios.post(`${url}/articles/`, body)
    .then(({ data: { article } }) => {
      return article;
    });
}

export const submitComment = (id, body) => {
  const { article_id } = id;
  return axios.post(`${url}/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      return data.comment;
    });
}

export const deleteComment = (id) => {
  return axios.delete(`${url}/comments/${id}`)
    .then(({ data }) => {
      return data;
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
    })
}

export const getArticleComments = (id, query) => {
  return axios.get(`${url}/articles/${id}/comments`, { params: query })
    .then(({ data: { comments } }) => {
      return comments;
    })
}

export const patchArticle = (id, voteDirection) => {
  //voteDirection : {inc_votes : 1} or {inc_votes : -1}
  return axios.patch(`${url}/articles/${id}`, voteDirection)
    .then(({ data: { article } }) => {
      return article;
    })
}

export const patchComment = (id, voteDirection) => {
  //voteDirection : {inc_votes : 1} or {inc_votes : -1}
  return axios.patch(`${url}/comments/${id}`, voteDirection)
    .then(({ data: { comment } }) => {
      return comment;
    })
}