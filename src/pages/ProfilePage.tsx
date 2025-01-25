import { Settings, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const userProfile = {
  name: "Alex Rivera",
  username: "@alexrivera",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  bio: "Senior Software Engineer | Photography enthusiast | Coffee addict ☕️",
  location: "San Francisco, CA",
  website: "alexrivera.dev",
  joinDate: "Joined March 2024",
  following: 234,
  followers: 1234,
  posts: [
    {
      id: 1,
      content: "Working on a new project using React and Tailwind. The developer experience is amazing! 💻",
      likes: 28,
      comments: 5,
      timestamp: "2h ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1682686580391-615b1e32be01?w=800",
      content: "Beautiful sunset at Golden Gate Bridge 🌅",
      likes: 156,
      comments: 12,
      timestamp: "1d ago"
    }
  ]
};

function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative pb-16">
        <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
        <div className="absolute -bottom-8 left-4">
          <Avatar className="w-32 h-32 border-4 border-white">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
          </Avatar>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="secondary">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-gray-500">{userProfile.username}</p>
        </div>

        <p className="text-gray-700">{userProfile.bio}</p>

        <div className="flex flex-wrap gap-4 text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {userProfile.location}
          </div>
          <div className="flex items-center">
            <LinkIcon className="h-4 w-4 mr-1" />
            <a href={`https://${userProfile.website}`} className="text-blue-500 hover:underline">
              {userProfile.website}
            </a>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {userProfile.joinDate}
          </div>
        </div>

        <div className="flex space-x-4">
          <p><strong>{userProfile.following}</strong> <span className="text-gray-500">Following</span></p>
          <p><strong>{userProfile.followers}</strong> <span className="text-gray-500">Followers</span></p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
          <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4 mt-4">
          {userProfile.posts.map(post => (
            <Card key={post.id} className="p-4">
              <p className="mb-4">{post.content}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="rounded-lg w-full h-64 object-cover mb-4"
                />
              )}
              <div className="flex items-center space-x-4 text-gray-500">
                <Button variant="ghost" size="sm">❤️ {post.likes}</Button>
                <Button variant="ghost" size="sm">💬 {post.comments}</Button>
                <span className="text-sm">{post.timestamp}</span>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="media">Media content</TabsContent>
        <TabsContent value="likes">Liked posts</TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;