import React, { useEffect, useState } from 'react';
import axios from 'axios';


const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticles();
    } catch (err) {
      console.error('Error deleting article', err);
    }
  };

  const handleCommentChange = (articleId, value) => {
    setNewComments({ ...newComments, [articleId]: value });
  };

  const handleAddComment = async (articleId) => {
    try {
      await axios.post(
        `http://localhost:3001/api/comments/${articleId}`,
        { text: newComments[articleId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComments({ ...newComments, [articleId]: '' });
      fetchArticles();
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticles();
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  const startEditingComment = (comment) => {
    setEditCommentId(comment.id);
    setEditedCommentText(comment.text);
  };

  const cancelEditing = () => {
    setEditCommentId(null);
    setEditedCommentText('');
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:3001/api/comments/${commentId}`,
        { text: editedCommentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditCommentId(null);
      setEditedCommentText('');
      fetchArticles();
    } catch (err) {
      console.error('Error updating comment', err);
    }
  };

  const handleAddArticle = async () => {
    try {
      await axios.post(
        'http://localhost:3001/api/articles',
        { title: newTitle, content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTitle('');
      setNewContent('');
      setShowForm(false);
      fetchArticles();
    } catch (err) {
      console.error('Error adding article', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Articles</h2>

      {token && (
        <div className="mb-4">
          <button
            className="btn btn-primary mb-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Article'}
          </button>

          {showForm && (
            <div className="card p-3">
              <h5>New Article</h5>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleAddArticle}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {articles.map((article) => (
        <div key={article.id} className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">{article.title}</h4>
            <p className="card-text">{article.content}</p>

          {user && user.id === article.userId && (
  <button onClick={() => handleDelete(article.id)}>Delete</button>
)}

            <h5>Comments:</h5>
            {article.Comments && article.Comments.length > 0 ? (
              <ul className="list-group mb-3">
                {article.Comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div style={{ flex: 1 }}>
                      <strong>{comment.User?.email}:</strong>{' '}
                      {editCommentId === comment.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                        />
                      ) : (
                        comment.text
                      )}
                    </div>
                    {user && comment.UserId === user.id && (
                      <div className="ms-2 d-flex">
                        {editCommentId === comment.id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-1"
                              onClick={() => handleUpdateComment(comment.id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-1"
                              onClick={() => startEditingComment(comment)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}

            {token && (
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment"
                  value={newComments[article.id] || ''}
                  onChange={(e) =>
                    handleCommentChange(article.id, e.target.value)
                  }
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddComment(article.id)}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
