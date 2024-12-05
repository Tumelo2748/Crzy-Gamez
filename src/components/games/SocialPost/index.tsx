import React, { useState } from 'react';
import { Post } from '../../../pages/SocialMediaPage/types';
import { getRandomEmbarrassingComment, getRandomNotification } from '../../../utils/socialMedia';

interface SocialPostProps {
  post: Post;
  onNotification: (content: string, type: string) => void;
}

export const SocialPost: React.FC<SocialPostProps> = ({ post, onNotification }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [commentInput, setCommentInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    if (Math.random() > 0.7) {
      onNotification("Oops! You just unfollowed everyone you know! 😱", "error");
      setLikes(prev => Math.max(0, prev - Math.floor(Math.random() * 10)));
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      onNotification(getRandomNotification(post.username), "like");
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      const embarrassingComment = getRandomEmbarrassingComment();
      setComments(prev => [...prev, {
        id: Math.random().toString(),
        username: 'you',
        content: embarrassingComment,
        timestamp: new Date().toISOString()
      }]);
      onNotification("Your comment was auto-corrected for maximum embarrassment! 🙈", "comment");
      setCommentInput('');
    }
  };

  const handleShare = () => {
    const randomActions = [
      "accidentally shared this to your family group",
      "tagged your boss in this",
      "set this as your profile picture",
      "sent this to your ex",
      "printed 100 copies of this"
    ];
    const action = randomActions[Math.floor(Math.random() * randomActions.length)];
    onNotification(`You just ${action}! 😅`, "awkward");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <img 
              src={post.avatar} 
              alt={post.username}
              className="w-10 h-10 rounded-full ring-2 ring-purple-500/20 group-hover:ring-purple-500 transition-all duration-300"
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-1 -right-1 bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
              Online
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 hover:text-purple-500 transition-colors cursor-pointer">
              {post.username}
            </h3>
            <p className="text-gray-500 text-sm flex items-center">
              {post.timestamp}
              <span className="mx-1">•</span>
              <span className="text-purple-500 cursor-pointer hover:underline">Follow</span>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p className="text-gray-800 text-lg leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative mt-2 group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <img 
            src={post.image} 
            alt="Post content"
            className={`w-full object-cover transition-all duration-500 ${
              isExpanded ? 'transform scale-[1.02] rotate-1' : ''
            }`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 group ${
              isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            } transition-colors`}
          >
            <svg 
              className={`w-6 h-6 transform group-hover:scale-110 transition-transform ${
                isLiked ? 'animate-heartbeat' : ''
              }`}
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span className="font-medium">{likes}</span>
          </button>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group"
          >
            <svg 
              className="w-6 h-6 transform group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <span className="font-medium">{comments.length}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors group"
          >
            <svg 
              className="w-6 h-6 transform group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          {comments.map(comment => (
            <div key={comment.id} className="mb-3 last:mb-0">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <div className="flex-1 bg-white rounded-2xl px-4 py-2 shadow-sm">
                  <span className="font-semibold text-gray-800">{comment.username}</span>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          <form onSubmit={handleComment} className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment... (it will be auto-corrected)"
                className="flex-1 px-4 py-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                style={{ WebkitAppearance: 'none' }}
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  commentInput.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 active:scale-95'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
