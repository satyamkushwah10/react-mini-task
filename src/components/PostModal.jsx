import React, { useState, useEffect } from 'react';

function PostModal({ post, note, onAddNote, onDeleteNote, onClose }) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(note);

  useEffect(() => {
    setNoteText(note);
    setShowNoteInput(false); // Reset editing state when post changes
  }, [note, post?.id]);

  // ESC key and body scroll management
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleSaveNote = () => {
    if (noteText?.trim()) {
      onAddNote(post.id, noteText.trim());
      setShowNoteInput(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  if (!post) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{post.title || 'Untitled'}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Post ID: {post.id} | User ID: {post.userId}</p>
            <p className="text-gray-700 leading-relaxed">{post.body || 'No content available'}</p>
          </div>

          {note && !showNoteInput && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-blue-800">Note:</strong>
                  <p className="text-blue-700 mt-1">{note}</p>
                </div>
                <button 
                  onClick={() => onDeleteNote(post.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {showNoteInput ? (
            <div className="mb-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add your note..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              />
              <div className="flex gap-3 mt-3">
                <button onClick={handleSaveNote} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Save
                </button>
                <button onClick={() => setShowNoteInput(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => setShowNoteInput(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                {note ? 'Edit Note' : 'Add Note'}
              </button>
              {note && (
                <button 
                  onClick={() => onDeleteNote(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Note
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostModal;