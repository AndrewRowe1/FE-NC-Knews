import React from 'react';
import { Link } from '@reach/router';
import '../TopicsList.css';

const TopicList = ({ topics }) => {
  return (
    <ul>
      {topics.map((topic) => {
        return <div key={topic.slug}>
          <li key={topic.slug}>{topic.slug}{' '}{topic.description}</li>
          <Link to={`/topics/${topic.slug}`} >Get related {topic.slug} articles</Link>
        </div>
      })}
    </ul>
  )
}

export default TopicList;