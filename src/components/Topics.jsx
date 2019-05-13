import React, { Component } from 'react';
import { getTopics } from '../api';
import TopicList from './TopicList';
//import { Router, Link } from '@reach/router';

class Topics extends Component {
  state = { topics: null, loading: true };

  render () {
    const { topics, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <TopicList topics={topics} />
      </div>
    );
  }

  componentDidMount () {
    getTopics()
      .then((topics) => {
        this.setState({ topics, loading: false });
      });
  }
}

export default Topics;