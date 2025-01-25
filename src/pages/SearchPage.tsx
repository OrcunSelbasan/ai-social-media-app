import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const trendingTopics = [
  "Photography", "Technology", "Travel", "Food", "Art", 
  "Music", "Fashion", "Sports", "Gaming", "Books"
];

const suggestedUsers = [
  {
    id: 1,
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    followers: "12.5K"
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "@marcuschen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    followers: "8.2K"
  }
];

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

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

      <div>
        <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Button
              key={topic}
              variant="secondary"
              className="rounded-full"
            >
              #{topic}
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
                <Button>Follow</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;