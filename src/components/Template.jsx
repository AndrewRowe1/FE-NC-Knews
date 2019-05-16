import React, { Component } from 'react';
import { patchArticle, getArticleComments, getArticle } from '../api';
import { navigate } from '@reach/router';

class Template extends Component {
  state = {} //buttonClicked: false };

  render () {
    //const { article, votes } = this.state;
    //const { state: locationState } = this.props.location;
    return (
      <div>
      </div >
    );
  }

  componentDidMount () {
    getArticle(this.props.article_id).then(article => {
      this.setState({ article });
    })
      .catch(({ response: { data, status } }) => {
        console.log(data.message, status)
        navigate('/not-found', { replace: true })
        // error in state
      })
  }

  componentDidUpdate (prevProps, prevState) {
    /*if (prevState.p !== this.state.p) {
      getArticles
    }*/
  }
}

export default Template;
