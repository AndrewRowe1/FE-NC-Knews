import React from 'react';
import { getArticles } from '../api';
import { navigate } from '@reach/router';

const TopicList = ({ topics }) => {
  return (
    <ul>
      {topics.map((topic) => {
        return <div>
          <li key={topic.slug}>{topic.slug}{' '}{topic.description}</li>
          <button onClick={() => getRelatedTopicArticles(topic)}>
            Get related {topic.slug} articles
          </button>
        </div>
      })}
    </ul>
  )
}

const getRelatedTopicArticles = (topic) => {
  getArticles({ topic: topic.slug }).then(article => {
    navigate(`/topics/${topic.slug}`, { state: { new: true } })
  });
}

export default TopicList;