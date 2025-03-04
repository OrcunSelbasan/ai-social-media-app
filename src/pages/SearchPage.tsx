import { useState } from 'react';
import { Search as SearchIcon, Heart, MessageSquare, TrendingUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TrendingPost {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  topic: string;
}

interface SuggestedUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  followers: string;
  followed: boolean;
}

const initialTrendingPosts: TrendingPost[] = [
  {
    id: 1,
    author: "Photography Pro",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content: "Capturing the perfect sunset requires patience and timing. Here's my latest shot from the beach 🌅",
    image: "https://images.unsplash.com/photo-1682686580391-615b1e32be01?w=800",
    likes: 1542,
    comments: 89,
    timestamp: "2h ago",
    topic: "Photography"
  },
  {
    id: 2,
    author: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content: "Just got my hands on the latest AI development kit. The possibilities are endless! #Technology",
    likes: 892,
    comments: 45,
    timestamp: "4h ago",
    topic: "Technology"
  },
  {
    id: 3,
    author: "Food Explorer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Found this amazing ramen spot in the city! The broth is incredible 🍜",
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800",
    likes: 2341,
    comments: 167,
    timestamp: "6h ago",
    topic: "Food"
  }
];

const initialTrendingTopics = [
  { name: "Photography", posts: 12500 },
  { name: "Technology", posts: 8900 },
  { name: "Travel", posts: 7600 },
  { name: "Food", posts: 6700 },
  { name: "Art", posts: 5400 },
  { name: "Music", posts: 4800 },
  { name: "Fashion", posts: 4200 },
  { name: "Sports", posts: 3900 },
  { name: "Gaming", posts: 3500 },
  { name: "Books", posts: 2800 }
];

const suggestedUsersPool: SuggestedUser[] = [
  {
    id: 1,
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    followers: "12.5K",
    followed: false
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "@marcuschen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    followers: "8.2K",
    followed: false
  },
  {
    id: 3,
    name: "Sophie Taylor",
    username: "@sophiet",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    followers: "15.8K",
    followed: false
  },
  {
    id: 4,
    name: "Alex Rivera",
    username: "@arivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    followers: "9.3K",
    followed: false
  },
  {
    id: 5,
    name: "Lily Zhang",
    username: "@lilyzhang",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    followers: "11.7K",
    followed: false
  }
];

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [trendingTopics] = useState(initialTrendingTopics);
  const [trendingPosts] = useState(initialTrendingPosts);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>(
    suggestedUsersPool.slice(0, 2)
  );

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setSearchQuery(selectedTopic === topic ? '' : `#${topic}`);
  };

  const handleFollow = (userId: number) => {
    setSuggestedUsers(current => {
      const updatedUsers = current.map(user =>
        user.id === userId ? { ...user, followed: true } : user
      );

      // Find a new user to suggest
      const followedCount = updatedUsers.filter(u => u.followed).length;
      const remainingUsers = suggestedUsersPool.filter(
        poolUser => !updatedUsers.some(u => u.id === poolUser.id)
      );

      if (remainingUsers.length > 0 && followedCount === updatedUsers.length) {
        const newUser = remainingUsers[0];
        return [...updatedUsers.filter(u => !u.followed), newUser];
      }

      return updatedUsers;
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search people, topics, or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Trending Posts */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Trending Now</h2>
        </div>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="flex-shrink-0 w-[300px]">
                {post.image && (
                  <div className="relative h-40">
                    <img 
                      src={post.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                    </Avatar>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Button
              key={topic.name}
              variant={selectedTopic === topic.name ? "default" : "secondary"}
              className="rounded-full"
              onClick={() => handleTopicClick(topic.name)}
            >
              #{topic.name}
              <span className="ml-2 text-xs">
                {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(topic.posts)}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Suggested Users</h2>
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.followers} followers</p>
                  </div>
                </div>
                <Button
                  variant={user.followed ? "secondary" : "default"}
                  onClick={() => handleFollow(user.id)}
                  disabled={user.followed}
                >
                  {user.followed ? 'Following' : 'Follow'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;