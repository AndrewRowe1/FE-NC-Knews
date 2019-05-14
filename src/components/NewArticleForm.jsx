import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { submitArticle } from '../api';

class NewArticleForm extends Component {
  state = {
    title: 'How',
    body: '',
    author: 'jessjelly',
    slug: 'coding'
  }

  render () {
    const { body } = this.state;
    return (
      <form onSubmit={this.handleSubmit} >
        <textarea onChange={(event => { this.handleChange('title', event.target.value) })} />
        <button >Submit Article</button>
      </form>
    )
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //I've clicked stop more clicking
    submitArticle(this.state).then(article => {
      navigate(`/articles/${article.article_id}`, { state: { new: true } })
    });
  };
}

export default NewArticleForm;