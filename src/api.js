import axios from 'axios';
const url = 'https://nc-news-andrewr.herokuapp.com/api';

export const getArticles = query => {
  return axios.get(`${url}/articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export const getArticle = id => {
  return axios.get(`${url}/articles/${id}`)
    .then(({ data: { article } }) => {
      return article;
    });
}

export const submitArticle = body => {
  return axios.post(`${url}/articles/`, body)
    .then(({ data: { article } }) => {
      return article;
    });
}

export const submitComment = (id, body) => {
  console.log(id, body)
  const { article_id } = id;
  console.log(`${url}/articles/${article_id}/comments`)
  return axios.post(`${url}/articles/${article_id}/comments`, body)
    .then(({ data: { comment } }) => {
      console.log(comment)
      return comment;
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

export const getArticleComments = id => {
  return axios.get(`${url}/articles/${id}/comments`)
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