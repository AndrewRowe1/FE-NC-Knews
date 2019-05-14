import React from 'react';

const TopicArticleList = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return <table>
          <tbody>
            <tr className="studentList">
              <th>Author</th>
              <th>Title</th>
              <th>Article ID</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
            </tr>
            <tr>
              <td>{article.author}</td>
              <td>{article.title}</td>
              <td>{article.article_id}</td>
              <td>{article.votes}</td>
              <td>{article.created_at}</td>
              <td>{article.body}</td>
            </tr>
          </tbody>
        </table>
      })}
    </ul>
  )
}

export default TopicArticleList;