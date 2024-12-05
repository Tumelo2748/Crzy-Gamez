import React, { useState, useEffect } from 'react';
import { Post, Notification } from './types';
import { SocialPost } from '../../components/games/SocialPost';
import { generateRandomPost } from '../../utils/socialMedia';
import { BackButton } from '../../components/ui/BackButton';

export const SocialMediaPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate initial posts
    const initialPosts = Array(5).fill(null).map(generateRandomPost);
    setPosts(initialPosts);
    setIsLoading(false);

    // Randomly add new posts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPosts(prev => [generateRandomPost(), ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNotification = (content: string, type: string) => {
    const newNotification: Notification = {
      id: Math.random().toString(),
      content,
      type: type as any,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 mb-6">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <BackButton to="/" className="text-gray-600 hover:text-gray-800" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Social Media But Worse
            </h1>
            <button 
              onClick={() => setPosts(prev => [generateRandomPost(), ...prev])}
              className="text-gray-600 hover:text-purple-500 transition-colors"
              title="Generate new post"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in
              ${notification.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' :
                notification.type === 'like' ? 'bg-pink-100 text-pink-800 border-l-4 border-pink-500' :
                notification.type === 'comment' ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500' :
                'bg-purple-100 text-purple-800 border-l-4 border-purple-500'
              }`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'error' ? '⚠️' :
                  notification.type === 'like' ? '❤️' :
                  notification.type === 'comment' ? '💭' :
                  '🎭'}
              </span>
              {notification.content}
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-gray-600 animate-pulse">Loading your chaotic feed...</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* New Post Button */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <button
                onClick={() => setPosts(prev => [generateRandomPost(), ...prev])}
                className="flex-grow text-left px-4 py-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Share something chaotic...
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post.id}
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <SocialPost
                  post={post}
                  onNotification={handleNotification}
                />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-8">
            <button
              onClick={() => setPosts(prev => [...prev, ...Array(3).fill(null).map(generateRandomPost)])}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
            >
              Load More Chaos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
