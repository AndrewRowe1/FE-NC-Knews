import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { submitArticle } from '../api';
import '../css/NewArticleForm.css';

class NewArticleForm extends Component {
  state = {
    topic: 'coding',
    title: null,
    body: null,
    author: this.props.loggedInUser
  }

  render () {
    const { loggedInUser, topics, execute } = this.props;
    return loggedInUser ? (execute ?
      (<div class="Background">
        <form class="formNAF" onSubmit={this.handleSubmit} >
          <span>
            <select type="dropdown" onChange={(event => { this.handleChange('topic', event.target.value) })}>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                )
              })}
            </select>
          </span>
          <span>
            <input required={true} placeholder="title" onChange={(event => { this.handleChange('title', event.target.value) })} />
          </span>
          <span>
            <input required={true} placeholder="body" onChange={(event => { this.handleChange('body', event.target.value) })} />
          </span>
          <button >Submit Article</button>
        </form>
      </div>) : <p class="p">Loading ......</p>
    ) : <div className="divNAF">
        <h2 className="h2">Please log in to be able to post an article!</h2>
      </div>
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value, author: this.props.loggedInUser });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    submitArticle(this.state).then(article => {
      navigate(`/articles/${article.article_id}`)
    });
  };
}

export default NewArticleForm;
