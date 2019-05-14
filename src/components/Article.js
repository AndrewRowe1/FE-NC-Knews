import React, { Component } from 'react';
import { getArticle } from '../api';

class Article extends Component {
  state = {};

  render () {
    const { article } = this.state;
    const { state: locationState } = this.props.location;
    if (!article) return <p>Loading...</p>
    return (
      <div>
        {locationState && locationState.new && (<p>Congratulations, you've just posted a new article!</p>)}
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
    );
  }

  componentDidMount () {
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article })
      })
  }
}

export default Article;