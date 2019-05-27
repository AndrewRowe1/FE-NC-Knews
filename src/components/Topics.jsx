import React, { Component } from 'react';
import { getTopics } from '../api';
import TopicsList from './TopicsList';
import '../css/Topics.css';

class Topics extends Component {
  state = { topics: null, loading: true };

  render () {
    const { topics, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <TopicsList topics={topics} />
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