import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { submitArticle } from '../api';

class NewArticleForm extends Component {
  state = {
    topic: 'coding',
    title: null,
    body: null,
    author: this.props.loggedInUser,
    warnBody: false,
    warnTitle: false
  }

  render () {
    const { loggedInUser, topics } = this.props;
    const { warnBody, warnTitle } = this.state;
    console.log(warnBody, 1)
    console.log(warnTitle, 2)
    return loggedInUser ? (
      <div>
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
        {(warnBody && warnTitle) ? <p>A body and a title need to be included in order to add an article!</p> : null}
        {warnBody && !warnTitle ? <p>A body needs to be included in order to add an article</p> : null}
        {!warnBody && warnTitle ? <p>A title needs to be included in order to add an article</p> : null}
      </div>
    ) : <p>Need to be logged in to be able to post an article!</p>
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value, author: this.props.loggedInUser });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //I've clicked stop more clicking
    const { title, body } = this.state;
    console.log(title)
    console.log(body)
    if (title !== null && body !== null) {
      submitArticle(this.state).then(article => {
        this.setState({ warnBody: false, warnTitle: false })
        navigate(`/articles/${article.article_id}`, { state: { new: true } })
      });
    }
    else {
      if (body === null && title === null) {
        console.log('body not and title not')
        this.setState({ warnBody: true, warnTitle: true })
        //return <p>A title needs to be included in order to add an article</p>
      }
      else if (title === null) {
        console.log('title not')
        this.setState({ warnTitle: true })
        //return <p>A title needs to be included in order to add an article</p>
      }
      else { // no body
        console.log('body not')
        this.setState({ warnBody: true })
        //return <p>A body needs to be included in order to add an article</p>
      }

    }
  };

  /*componentDidMount () {
  }*/
}

export default NewArticleForm;
