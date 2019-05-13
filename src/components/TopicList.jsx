import React from 'react';

const TopicList = ({ topics }) => {
  return (
    <ul>
      {topics.map((topic) => {
        return <li key={topic.slug}>{topic.slug}{' '}{topic.description}</li>
      })}
    </ul>
  )
}

export default TopicList;