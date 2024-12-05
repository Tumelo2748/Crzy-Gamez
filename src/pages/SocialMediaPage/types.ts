export interface Post {
  id: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  content: string;
  type: 'like' | 'comment' | 'follow' | 'awkward' | 'error';
  timestamp: Date;
}
