import React from 'react';
import { Link } from '@reach/router';
import '../css/TopicsList.css';

const TopicList = ({ topics }) => {
  return (
    <div class="TopicsList">
      {topics.map((topic) => {
        return <div key={topic.slug}>
          <h1 className="h1" key={topic.slug}>{topic.slug}</h1>
          <h2 className="h2">{topic.description}</h2>
          <Link className="TopicsLinks" to={`/topics/${topic.slug}`} >Get {topic.slug} related articles</Link>
        </div>
      })}
    </div>
  )
}

export default TopicList;