import React, { useState, useEffect } from 'react';

function PostItem({ post, note, onAddNote, onDeleteNote, onPostClick }) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(note);

  useEffect(() => {
    setNoteText(note);
  }, [note]);

  const handleSaveNote = () => {
    if (noteText?.trim()) {
      onAddNote(post.id, noteText.trim());
      setShowNoteInput(false);
    }
  };

  if (!post) return null;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div 
        onClick={() => onPostClick?.(post)}
        className="cursor-pointer hover:bg-gray-50 -m-6 p-6 rounded-lg mb-4"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">{post.title || 'Untitled'}</h3>
        <p className="text-gray-600 leading-relaxed">{post.body || 'No content available'}</p>
        <p className="text-xs text-gray-400 mt-2">Click to view details</p>
      </div>
      
      {note && !showNoteInput && (
        <div className="bg-blue-50 p-3 rounded-lg mb-3 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <strong className="text-blue-800">Note:</strong> <span className="text-blue-700">{note}</span>
            </div>
          </div>
        </div>
      )}
      
      {showNoteInput ? (
        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your note..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
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
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
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
  );
}

export default PostItem;