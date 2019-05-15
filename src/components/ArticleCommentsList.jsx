import React from 'react';

const ArticleCommentsList = ({ comments }) => {
  return (
    <table>
      <tbody>
        <tr className="articleCommentsList">
          <th>Author</th>
          <th>Comment ID</th>
          <th>Article ID</th>
          <th>Votes</th>
          <th>Created At</th>
          <th>Body</th>
        </tr>
        {comments.map((comment) => {
          return (
            <tr>
              <td>{comment.author}</td>
              <td>{comment.comment_id}</td>
              <td>{comment.article_id}</td>
              <td>{comment.votes}</td>
              <td>{comment.created_at}</td>
              <td>{comment.body}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default ArticleCommentsList;