import React, { Component } from 'react';
import { getArticles } from '../api';

// in articles
class Template extends Component {
  state = { article: null, votes: 0 } //buttonClicked: false };

  render () {
    //const { article, votes } = this.state;
    //const { state: locationState } = this.props.location;
    return (
      <div>
      </div >
    );
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

export default Template;
