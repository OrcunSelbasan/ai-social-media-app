import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    content: "liked your post about morning hike",
    time: "2m ago",
    read: false
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    },
    content: "commented on your photo",
    time: "1h ago",
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: {
      name: "Sophie Taylor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    content: "started following you",
    time: "3h ago",
    read: true
  }
];

function NotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="ghost">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} className="w-full h-full object-cover" />
                </Avatar>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  {getNotificationIcon(notification.type)}
                  <span>
                    <strong>{notification.user.name}</strong> {notification.content}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;