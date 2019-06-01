import React from 'react';
import { Link } from '@reach/router';
import '../css/TopicsList.css';

const TopicList = ({ topics }) => {
  return (
    <div class="TopicsList">
      {topics.map((topic) => {
        return <div key={topic.slug}>
          <h1 class="h1" key={topic.slug}>{topic.slug}</h1>
          <h2 class="h2">{topic.description}</h2>
          <Link class="TopicsLinks" to={`/topics/${topic.slug}`} >Get {topic.slug} related articles</Link>
        </div>
      })}
    </div>
  )
}

export default TopicList;