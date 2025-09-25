import React from 'react';
import PostItem from './PostItem';

function PostList({ posts = [], notes = {}, onAddNote, onDeleteNote, onPostClick }) {
  if (!posts.length) {
    return <div className="text-center py-10 text-gray-600">No posts to display</div>;
  }

  return (
    <div className="grid gap-6">
      {posts.map(post => (
        post && post.id ? (
          <PostItem
            key={post.id}
            post={post}
            note={notes[post.id] || ''}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onPostClick={onPostClick}
          />
        ) : null
      ))}
    </div>
  );
}

export default PostList;
