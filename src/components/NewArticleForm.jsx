import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { submitArticle } from '../api';

class NewArticleForm extends Component {
  state = {
    topic: 'coding',
    title: null,
    body: null,
    author: this.props.loggedInUser,
  }

  render () {
    const { loggedInUser, topics } = this.props;
    return loggedInUser ? (
      <form onSubmit={this.handleSubmit} >
        <span>
          <select type="dropdown" onChange={(event => { this.handleChange('topic', event.target.value) })}>
            {topics.map((topic) => {
              return (
                <option value={topic.slug}>{topic.slug}</option>
              )
            })}
          </select>
        </span>
        <span>
          <textarea placeholder="title" onChange={(event => { this.handleChange('title', event.target.value) })} />
        </span>
        <span>
          <textarea placeholder="body" onChange={(event => { this.handleChange('body', event.target.value) })} />
        </span>
        <button >Submit Article</button>
      </form>
    ) : <p>Need to be logged in to be able to post an article!</p>
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value, author: this.props.loggedInUser });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //I've clicked stop more clicking
    submitArticle(this.state).then(article => {
      navigate(`/articles/${article.article_id}`, { state: { new: true } })
    });
  };

  /*componentDidMount () {
  }*/
}

export default NewArticleForm;
