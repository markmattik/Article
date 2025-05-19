import React from 'react';

function ArticleFormPage() {
  return (
    <div>
      <h2>Create New Article</h2>
      <form>
        <input type="text" placeholder="Title" required /><br />
        <textarea placeholder="Content" required></textarea><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ArticleFormPage;
