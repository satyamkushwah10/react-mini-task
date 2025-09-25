import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PostList from './PostList';
import PostModal from './PostModal';

function PostsApp() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
    try {
      const savedNotes = localStorage.getItem('postNotes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch {
      localStorage.removeItem('postNotes');
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter(post =>
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const addNote = (postId, note) => {
    if (!note?.trim()) return;
    const updatedNotes = { ...notes, [postId]: note.trim() };
    setNotes(updatedNotes);
    try {
      localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
    } catch {}
  };

  const deleteNote = (postId) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[postId];
    setNotes(updatedNotes);
    try {
      localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
    } catch {}
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) return <div className="text-center py-10">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (filteredPosts.length === 0) return <div className="text-center py-10 text-gray-600">No posts found</div>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts API with Notes</h2>
      <SearchBar onSearch={handleSearch} />
      <button 
        onClick={() => { setNotes({}); localStorage.removeItem('postNotes'); }}
        className="mb-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Clear All Notes
      </button>
      
      {filteredPosts.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
        </div>
      )}
      
      <PostList 
        posts={currentPosts} 
        notes={notes} 
        onAddNote={addNote} 
        onDeleteNote={deleteNote}
        onPostClick={setSelectedPost}
      />
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={safePage === 1}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-gray-700">
            Page {safePage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={safePage === totalPages}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      
      {selectedPost && (
        <PostModal
          post={selectedPost}
          note={notes[selectedPost.id] || ''}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default PostsApp;