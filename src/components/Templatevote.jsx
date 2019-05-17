import React, { Component } from 'react';
import { patchArticle, getArticle, getArticles } from '../api';

// in articles
class TemplateVote extends Component {
  state = { article: null, votes: 0 } //buttonClicked: false };

  render () {
    const { article, votes } = this.state;
    //const { state: locationState } = this.props.location;
    return (
      <div>
        <h3>votes: {article.votes + votes}</h3>
        <button disabled={votes === 1} onClick={() => this.handleVote(1)}> like</button>
        <button disabled={votes === -1} onClick={() => this.handleVote(-1)}> dislike</ button>
      </div >
    );
  }
  //disable button
  //conditional rendering

  handleVote = (direction) => {
    patchArticle(this.props.article_id, { inc_votes: direction })
      .then(article => {
        this.setState((prevState) => {
          const newVote = prevState.votes + direction;
          return {
            votes: newVote,
            //buttonClicked: true
          }
        })
      })

    //optimistic
    patchArticle(this.props.article_id, { inc_votes: direction });
    this.setState((prevState) => {
      const newVote = prevState.votes + direction;
      return {
        votes: newVote,
        //buttonClicked: true
      }
    })
  }

  componentDidMount () {
    //axios.get
    let { votes } = this.state
    getArticle(this.props.article_id).then((article) => {
      this.setState({ article, votes });
    })
  }


  //pagination
  /* 
  total_count in state - needs destructuring from get axios request
<button disabled={p<Math.ceil(total_count / 10)} onClick={() => { this.changePage(1) }} >More Articles</button>
<button disabled={this.state.p === 1} onClick={() => { this.changePage(-1) }} >Previous Articles</button>
*/
  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      getArticles
    }
  }


}

export default TemplateVote;
