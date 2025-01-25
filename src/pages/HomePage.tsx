import { useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content: "Just finished my morning hike! The sunrise was absolutely breathtaking today. 🌄",
    image: "https://images.unsplash.com/photo-1682686580391-615b1e32be01?w=800",
    likes: 42,
    comments: 8,
    timestamp: "2h ago"
  },
  {
    id: 2,
    author: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content: "Working on a new project using React and Tailwind. The developer experience is amazing! 💻",
    likes: 28,
    comments: 5,
    timestamp: "4h ago"
  }
];

function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <>
      {/* Stories */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150`} 
                  alt={`User ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </Avatar>
            </div>
            <span className="text-xs">User {i + 1}</span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image && (
              <img 
                src={post.image} 
                alt="Post content" 
                className="rounded-lg w-full h-64 object-cover mb-4"
              />
            )}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleLike(post.id)}
                className="text-red-500"
              >
                ❤️ {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                💬 {post.comments}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default HomePage;