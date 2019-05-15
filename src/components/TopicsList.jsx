import React from 'react';
import { navigate } from '@reach/router';

const TopicList = ({ topics }) => {
  return (
    <ul>
      {topics.map((topic) => {
        return <div>
          <li key={topic.slug}>{topic.slug}{' '}{topic.description}</li>
          <button onClick={() => navigate(`/topics/${topic.slug}`, { state: { new: true } })}>
            Get related {topic.slug} articles
          </button>
        </div>
      })}
    </ul>
  )
}

export default TopicList;